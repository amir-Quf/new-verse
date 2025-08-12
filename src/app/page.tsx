import Container from "@/components/container";
import Footer from "@/components/footer";
import Link from "next/link";
import { Slider } from "@/components/ui/slider"
import { CarouselDemo } from "@/components/slider";
export default function Home() {
  return (
    <>
      <header className="bgImageHeader bg-cover bg-center h-[80vh] w-full flex items-center justify-center">
        <h1 className="font-bold text-5xl text-white text-shadow-white">
          new verse
        </h1>
      </header>
      <main className="newVerseIcon bg-cover bg-center newVerseIcon">
          <div className="xl:mx-90 min-[850px]:max-[1500px]:mx-70 lg:mx:60 md:mx-30 sm:mx-20 px-5 py-10 bg-primary text-white leading-8">
          <div>
            <div className="flex items-center ">
              <img
                src="/images/new-verse-icon.jpg"
                alt="icon"
                className="w-20 h-20"
              />
              <h2 className="font-bold text-2xl py-10">Lorem ipsum dolor </h2>
            </div>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              mollitia omnis voluptatibus ullam distinctio vitae, ipsa,
              voluptate deserunt, voluptatem tempora porro? Pariatur earum eaque
              accusamus quod quibusdam nulla ipsa accusantium. Illum, magni.
              Atque nisi eius eaque reiciendis optio voluptates, nulla ab,
              repellendus natus, itaque architecto eligendi blanditiis!
              Assumenda corporis aliquam, quae eius eveniet voluptate itaque
              labore laborum architecto nemo dolores. Hic quas neque earum
              consequuntur omnis laborum cum accusantium animi magni in
              exercitationem ab recusandae est aspernatur nesciunt reprehenderit
              quisquam similique, corrupti itaque commodi veritatis at
              voluptatem eveniet! Ex, dolorum.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-2xl py-10">my producer : </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              facere amet iste accusantium exercitationem corporis earum error,
              deserunt ab atque commodi dolor obcaecati tenetur! Fugit ratione
              cumque sint cum nemo.<Link href='/producer'>more </Link>
            </p>
          </div>
          <CarouselDemo/>
          </div>
      </main>
      <Footer />
    </>
  );
}
