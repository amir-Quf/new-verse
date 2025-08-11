import Container from "@/components/container";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <header className="relative header bg-cover bg-center h-[70vh] w-full flex items-center justify-center">
        <h1 className="font-bold text-5xl text-white text-shadow-white">
          new verse
        </h1>
      </header>
      <main className="newVerseIcon bg-cover bg-center w-full flex items-center justify-center">
            <Container>
          <div className="xl:mx-90 lg:mx-40 md:mx-20 mx-5 py-10 text-white">
            <h2 className="font-bold text-2xl py-10">Lorem ipsum dolor </h2>
            <p>
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
            </Container>
      </main>
      <Footer />
    </>
  );
}
