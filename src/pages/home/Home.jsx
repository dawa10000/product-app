import AllProducts from "./products/AllProducts";

export default function Home() {
  return (
    <div>
      <div className="flex items-center text-center max-lg:justify-center max-lg:flex-wrap p-10">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl">WELCOME TO THE PRODUCT APP</h1>
          <p className="text-center font-bold mt-5 text-gray-400">
            Welcome to TheProductDB: An open, crowd-sourced database of products
            from around the world. We offer a free product API for anyone
            wanting to use it, with additional premium features if required.
          </p>
        </div>
      </div>
      <AllProducts />
    </div>
  );
}
