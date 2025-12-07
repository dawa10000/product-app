import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { baseURL } from "@/config/apis";
import { useApi } from "@/hooks/apiHooks";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [data, load, err] = useApi(baseURL);
  const nav = useNavigate();

  if (load) return <h1>Loading...</h1>;
  if (err) return <h1 className="text-red-600">{err.data}</h1>;

  return (
    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 mb-12 px-4">
      {data &&
        data.products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden shadow-lg rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            {/* IMAGE */}
            <CardContent className="px-0 pt-0">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-video w-full object-cover rounded-t-2xl"
              />
            </CardContent>

            {/* TITLE + DESCRIPTION */}
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {product.title}
              </CardTitle>

              <CardDescription className="line-clamp-3 text-gray-600">
                {product.description}
              </CardDescription>
            </CardHeader>

            {/* FOOTER BUTTONS */}
            <CardFooter className="flex gap-3 max-sm:flex-col max-sm:items-stretch">
              <Button
                onClick={() => nav(`/single-product/${product.id}`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-2 cursor-pointer"
              >
                Explore More
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
