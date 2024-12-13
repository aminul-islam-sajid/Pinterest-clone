import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const gallery = [
    {
      _id: 1,
      title: "spider man",
      imageURL: "/img1.jpeg"
    },
    {
      _id: 2,
      title: "spider man",
      imageURL: "/img5.jpeg"
    },
    {
      _id: 3,
      title: "spider man",
      imageURL: "/img3.jpeg"
    }
  ]
  return (
    <>
      <div className="container mx-auto p-4">
        {
          (!gallery || gallery.length <= 0) ? (<div className="flex justify-center items-center min-h-[750pxs]">
            <ClipLoader color="#ef4444" size={120} />
          </div>
          ) : gallery.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
              {
                gallery.map(item => {
                  return (
                    <Link href={`/pin/${item._id}`} key={item._id} className="relative mb-4 group">
                      <Image src={item.imageURL} alt={item.title} height={300} width={300} className="h-auto w-full rounded-lg" />
                      <span className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  )
                })
              }
            </div>) : <h3 className="min-h-[750px] justify-center items-center flex text-red-500 font-semibold ">
            Not found this is your search!
          </h3>

        }
      </div>
    </>
  );
}
