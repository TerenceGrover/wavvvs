import Track from './Track.component.jsx';

export default function Profile() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex flex-col justify-center items-center p-6">
        <section className="flex flex-col justify-center items-center">
          <img
            className="w-48 h-48 rounded"
            src="https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2563.jpg?w=2000"
            alt="profile-pic"
          />
          <h1 className="text-white text-2xl mt-7 mb-1">Mateo Presa</h1>
          <p className="text-neutral-400">@mateopresa</p>
        </section>
        <hr className="w-full border-neutral-800 my-6" />
        <section>
          <p className="text-xs text-neutral-400 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            id neque at nulla suscipit dapibus.
          </p>
        </section>
        <hr className="w-full border-neutral-800 my-6" />
        <section className="w-full">
          <div className="w-full">
            <h2 className="text-white text-xl text-left">Tracks</h2>
          </div>
          <Track />
          <Track />
          <Track />
        </section>
      </div>
    </div>
  );
}
