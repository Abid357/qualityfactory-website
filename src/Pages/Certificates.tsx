import CertificatesData from "../Components/Certificates/Certificates.json";

export default function Certificates() {
  return (
    <div className="w-[80%] mx-auto mb-10 pt-20 md:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {CertificatesData.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-full h-auto max-h-fit"
          >
            <img src={cert.src} alt={`${cert.name} certificate`} />
          </div>
        ))}
      </div>
    </div>
  );
}
