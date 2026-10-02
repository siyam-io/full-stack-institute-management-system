import assert from "assert";

const BASE_URL = "http://localhost:3043/api";

async function run() {
  console.log("🚀 Running SQL-Native API Contract Tests...");

  let cookie;
  let testCourseId;
  let testBatchId;
  let testStudentId;
  let testBranchId;

  // 0. Fetch initial seed info
  // Let's perform login
  console.log("1. Testing login...");
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "ssiyam563@gmail.com",
      password: "123456"
    })
  });

  assert.strictEqual(loginRes.status, 200);
  const loginData = await loginRes.json();
  assert.strictEqual(loginData.success, true);
  assert.ok(loginData.data.id);
  assert.strictEqual(loginData.data._id, undefined); // should be stripped
  assert.strictEqual(loginData.data.email, "ssiyam563@gmail.com");
  
  testBranchId = loginData.data.branch?.id || loginData.data.branchId;
  assert.ok(testBranchId);

  // Capture cookie
  cookie = loginRes.headers.get("set-cookie");
  assert.ok(cookie);
  console.log("✅ Login successful, cookie captured.");

  // 2. Courses API
  console.log("2. Testing Course Creation...");
  const courseRes = await fetch(`${BASE_URL}/courses/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie
    },
    body: JSON.stringify({
      course_name: "Test Course " + Date.now(),
      course_code: "TC-" + Date.now().toString().slice(-4),
      duration_value: 3,
      duration_unit: "months",
      base_fee: 12000,
      additional_info: ["Course Intro", "Intermediate Modules"],
      description: "Auto contract test course"
    })
  });

  assert.strictEqual(courseRes.status, 201);
  const courseData = await courseRes.json();
  assert.ok(courseData.data.id);
  testCourseId = courseData.data.id;
  console.log("✅ Course created successfully.");

  // 3. Batches API
  console.log("3. Testing Batch Creation...");
  const batchRes = await fetch(`${BASE_URL}/batches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie
    },
    body: JSON.stringify({
      batch_name: "Contract Test Batch " + Date.now(),
      course: testCourseId,
      branch: testBranchId,
      start_date: new Date().toISOString(),
      time_slot: {
        start_time: "10:00 AM",
        end_time: "01:00 PM"
      },
      schedule_days: ["Sunday", "Tuesday"],
      status: "Upcoming"
    })
  });

  assert.ok(batchRes.status === 200 || batchRes.status === 201);
  const batchData = await batchRes.json();
  assert.ok(batchData.data.id);
  testBatchId = batchData.data.id;
  console.log("✅ Batch created successfully.");

  // 4. Students API
  console.log("4. Testing Student Creation...");
  const studentRes = await fetch(`${BASE_URL}/students/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookie
    },
    body: JSON.stringify({
      student_name: "Contract Test Student",
      fathers_name: "Father of Test",
      student_id: "ST-" + Date.now().toString().slice(-6),
      registration_number: "REG-" + Date.now().toString().slice(-6),
      gender: "male",
      contact_number: "+8801700000888",
      email: "student-" + Date.now() + "@cibdhk.com",
      address: "Dhaka, Bangladesh",
      course: testCourseId,
      batch: testBatchId,
      branch: testBranchId,
      issue_date: new Date().toISOString()
    })
  });

  assert.strictEqual(studentRes.status, 201);
  const studentData = await studentRes.json();
  assert.ok(studentData.data.id);
  assert.strictEqual(studentData.data.studentName, "Contract Test Student");
  testStudentId = studentData.data.id;
  console.log("✅ Student created successfully.");

  // 5. Finance API
  console.log("5. Testing Student Finance Summary...");
  const financeRes = await fetch(`${BASE_URL}/finance/student/${testStudentId}`, {
    headers: { "Cookie": cookie }
  });

  assert.strictEqual(financeRes.status, 200);
  const financeData = await financeRes.json();
  assert.ok(financeData.data.fee_summary);
  assert.strictEqual(financeData.data.fee_summary._id, undefined);
  console.log("✅ Student finance retrieved successfully.");

  console.log("\n🎉 ALL CONTRACT TESTS PASSED SUCCESSFULLY! 🎉\n");
}

run().catch((e) => {
  console.error("\n❌ CONTRACT TEST FAILED ❌");
  console.error(e);
  process.exit(1);
});
