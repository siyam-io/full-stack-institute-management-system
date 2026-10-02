export default function LocationMap() {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
      {/* Responsive container with 16:9 aspect ratio */}
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d322.78753610106565!2d90.37910819710673!3d23.750086204847523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b95e7a43bf21%3A0xd1c7ee1fe52d6a70!2sCIB%20-%20The%20Culinary%20Institute%20of%20Bangladesh!5e0!3m2!1sen!2sbd!4v1777794969457!5m2!1sen!2sbd"
          width="600"
          height="450"
          style={{
            border: 0,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
