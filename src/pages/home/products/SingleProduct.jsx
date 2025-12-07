import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getSingleProduct } from "@/config/apis";
import { useApi } from "@/hooks/apiHooks";
import { useParams } from "react-router-dom";
import { Badge } from "lucide-react";

export default function SingleProduct() {
  const { id } = useParams();
  const url = getSingleProduct({ id });
  const [data, load, err] = useApi(url, {});

  if (load) return <h1 className="text-center text-lg mt-10">Loading...</h1>;
  if (err) return <h1 className="text-red-600 text-center">{err.message}</h1>;
  if (!data) return <h1>No product found</h1>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">

      {/* MAIN CARD */}
      <Card className="p-4 sm:p-8 shadow-xl rounded-3xl border bg-white/80 backdrop-blur-sm flex flex-col">

        {/* GRID: LEFT IMAGE + RIGHT DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 flex-1">

          {/* LEFT: IMAGE & GALLERY */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-4 border">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-full h-64 sm:h-80 md:h-[420px] object-cover rounded-xl"
              />
            </div>
            <div className="flex gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
              {data.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="product"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border shadow hover:scale-105 transition cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="flex flex-col">
            <CardHeader className="p-0 space-y-2">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                {data.title}
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {data.description}
              </CardDescription>
            </CardHeader>

            {/* PRICE & RATING */}
            <div className="mt-4 space-y-3">
              <div className="flex items-end gap-3">
                <p className="text-3xl sm:text-4xl font-semibold text-green-700">
                  ${data.price}
                </p>
                <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow">
                  -{data.discountPercentage}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-yellow-500 text-lg">
                  {"★".repeat(Math.round(data.rating))}
                  {"☆".repeat(5 - Math.round(data.rating))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  ({data.rating} / 5)
                </span>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-2">
                {data.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow-sm text-xs sm:text-sm"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* PRODUCT DETAILS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-gray-700 text-sm">
                <p><b>Brand:</b> {data.brand}</p>
                <p><b>Category:</b> {data.category}</p>
                <p><b>Stock:</b> {data.stock}</p>
                <p><b>Status:</b> {data.availabilityStatus}</p>
                <p><b>SKU:</b> {data.sku}</p>
                <p><b>Weight:</b> {data.weight} kg</p>
                <p><b>Min Order:</b> {data.minimumOrderQuantity}</p>
                <p><b>Shipping:</b> {data.shippingInformation}</p>
                <p><b>Warranty:</b> {data.warrantyInformation}</p>
                <p><b>Return:</b> {data.returnPolicy}</p>
              </div>

              <div className="mt-2 text-sm text-gray-700">
                <b>Dimensions:</b> {data.dimensions.width} × {data.dimensions.height} × {data.dimensions.depth} cm
              </div>
            </div>
          </div>
        </div>

        {/* CTA BUTTONS INSIDE CARD FOOTER */}
        <CardFooter className="flex flex-col sm:flex-row gap-6 mt-6 justify-between">
          <Button className="w-full sm:w-1/2 py-5 text-lg font-bold rounded-2xl shadow-lg bg-orange-500 hover:bg-orange-600 transition-transform hover:scale-105 cursor-pointer">
            Add to Cart
          </Button>
          <Button className="w-full sm:w-1/2 py-5 text-lg font-bold rounded-2xl shadow-lg border border-orange-500 text-orange-600 hover:bg-orange-50 transition-transform hover:scale-105 cursor-pointer">
            Buy Now
          </Button>
        </CardFooter>
      </Card>

      {/* CUSTOMER REVIEWS */}
      <div className="mt-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {data.reviews.map((review, i) => (
            <Card
              key={i}
              className="p-4 sm:p-6 rounded-2xl shadow-xl border bg-white/70 backdrop-blur-sm"
            >
              <p className="font-semibold text-lg text-gray-800">{review.reviewerName}</p>
              <div className="text-yellow-500 text-lg mt-1">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-3">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* META */}
      <div className="text-xs text-gray-400 mt-10 pb-10 space-y-1">
        <p>Created: {new Date(data.meta.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(data.meta.updatedAt).toLocaleString()}</p>
        <p>Barcode: {data.meta.barcode}</p>
      </div>
    </div>
  );
}
