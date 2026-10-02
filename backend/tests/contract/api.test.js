import request from "supertest";
import app from "../../src/app.js";
import prisma from "../../src/core/db/prisma.js";

describe("SQL-Native Contract API Tests", () => {
  let cookie;
  let testCourseId;
  let testBatchId;
  let testStudentId;
  let testBranchId;
  let testRoleId;

  beforeAll(async () => {
    // Clean database connections or get values for existing seeded models
    const branch = await prisma.branch.findFirst();
    testBranchId = branch?.id;

    const role = await prisma.role.findFirst({ where: { name: "superadmin" } });
    testRoleId = role?.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("Auth API", () => {
    it("should successfully login with superadmin credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "ssiyam563@gmail.com",
          password: "123456"
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data._id).toBeUndefined(); // no _id
      expect(res.body.data.email).toBe("ssiyam563@gmail.com");

      // Extract JWT cookie
      cookie = res.headers["set-cookie"];
      expect(cookie).toBeDefined();
    });
  });

  describe("Courses API", () => {
    it("should fetch all courses", async () => {
      const res = await request(app)
        .get("/api/courses")
        .set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should create a new course", async () => {
      const res = await request(app)
        .post("/api/courses")
        .set("Cookie", cookie)
        .send({
          courseName: "Test Course " + Date.now(),
          courseCode: "TC-" + Date.now().toString().slice(-4),
          durationValue: 3,
          durationUnit: "months",
          baseFee: 12000,
          additionalInfo: ["A", "B"],
          description: "Test description"
        });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.courseName).toBeDefined();
      testCourseId = res.body.data.id;
    });
  });

  describe("Batches API", () => {
    it("should create a new batch", async () => {
      const res = await request(app)
        .post("/api/batches")
        .set("Cookie", cookie)
        .send({
          batchName: "Test Batch " + Date.now(),
          startDate: new Date().toISOString(),
          scheduleDays: ["Sunday", "Tuesday"],
          startTime: "10:00 AM",
          endTime: "01:00 PM",
          status: "Upcoming",
          courseId: testCourseId,
          branchId: testBranchId
        });

      expect(res.status).toBe(200); // createBatch returns 200 in current setup
      expect(res.body.data.id).toBeDefined();
      testBatchId = res.body.data.id;
    });
  });

  describe("Students API", () => {
    it("should create a new student", async () => {
      const res = await request(app)
        .post("/api/students")
        .set("Cookie", cookie)
        .send({
          name: "Test Student",
          fatherName: "Father Test",
          studentId: "ST-" + Date.now().toString().slice(-6),
          registrationNumber: "REG-" + Date.now().toString().slice(-6),
          gender: "Male",
          contactNumber: "+8801700000999",
          email: "student-" + Date.now() + "@example.com",
          address: "Dhaka, Bangladesh",
          courseId: testCourseId,
          batchId: testBatchId,
          branchId: testBranchId,
          issueDate: new Date().toISOString()
        });

      expect(res.status).toBe(201);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.studentName).toBe("Test Student");
      testStudentId = res.body.data.id;
    });
  });

  describe("Finance API", () => {
    it("should fetch student financial summary", async () => {
      const res = await request(app)
        .get(`/api/finance/student/${testStudentId}`)
        .set("Cookie", cookie);

      expect(res.status).toBe(200);
      expect(res.body.data.fee_summary).toBeDefined();
      expect(res.body.data.fee_summary.id).toBeDefined();
      expect(res.body.data.fee_summary._id).toBeUndefined(); // no _id
    });
  });
});
