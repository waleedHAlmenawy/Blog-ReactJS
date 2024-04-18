import useHomeArticles from "../hooks/useHomeArticles";

export default function HomeCard() {
  const [homeArticles] = useHomeArticles();

  return (
    <div className=" text-white flex">
      <div
        className="min-w-96 p-10 flex items-end"
        style={{
          backgroundImage: `url('${homeArticles[0]?.image}')`,
          height: "60vh",
          width: "30vw",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full">
          <p className="text-3xl font-bold py-6 drop-shadow">
            {homeArticles[0]?.title}
          </p>

          <div className="flex justify-between items-center text-sm max-w-80 bg-black w-full rounded-full pr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-32 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={homeArticles[0]?.user.image}
                />
              </div>
            </div>

            <div>{homeArticles[0]?.user.username}</div>
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div>{homeArticles[0]?.date}</div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div
          className="min-w-96 p-4 flex items-end"
          style={{
            backgroundImage: `url('${homeArticles[1]?.image}')`,
            height: "30vh",
            width: "10vw",
            backgroundSize: "cover",
          }}
        >
          <div>
            <p className="text-xl font-bold py-2 drop-shadow">
              {homeArticles[1]?.title}
            </p>

            <div className="flex justify-between items-center text-sm max-w-80 bg-black w-full rounded-full pr-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-32 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={homeArticles[1]?.user.image}
                  />
                </div>
              </div>

              <div>{homeArticles[1]?.user.username}</div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div>{homeArticles[1]?.date}</div>
            </div>
          </div>
        </div>

        <div
          className="min-w-96 p-4 flex items-end"
          style={{
            backgroundImage: `url('${homeArticles[2]?.image}')`,
            height: "30vh",
            width: "10vw",
            backgroundSize: "cover",
          }}
        >
          <div>
            <p className="text-xl font-bold py-2 drop-shadow">
              {homeArticles[2]?.title}
            </p>

            <div className="flex justify-between items-center text-sm max-w-80 bg-black w-full rounded-full pr-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-32 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={homeArticles[2]?.user.image}
                  />
                </div>
              </div>

              <div>{homeArticles[2]?.user.username}</div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div>{homeArticles[2]?.date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
