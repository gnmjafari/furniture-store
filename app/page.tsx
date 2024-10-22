import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div
        className="min-w-full h-svh"
        style={{
          backgroundImage: `url('/image/cover.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="font-extrabold text-xl">Browse The Range</div>
        <div className="font-normal text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="flex justify-center items-center mt-10 gap-5">
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/dining.png"
              alt="Next.js dining"
              width={381}
              height={490}
              priority
            />
            Dining
          </div>
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/living.png"
              alt="Next.js living"
              width={381}
              height={490}
              priority
            />
            Living
          </div>
          <div className="flex flex-col gap-5 justify-center items-center flex-1 overflow-hidden rounded-md text-xl">
            <Image
              src="/image/bedroom.png"
              alt="Next.js bedroom"
              width={381}
              height={490}
              priority
            />
            Bedroom
          </div>
        </div>
      </div>
    </div>
  );
}
