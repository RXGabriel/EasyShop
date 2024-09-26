import {
  Airplay,
  BabyIcon,
  ChevronRightIcon,
  Heater,
  WatchIcon,
} from "lucide-react";
import Men from "../../assets/man.png";
import Sneakers from "../../assets/sneakers.png";
import Woman from "../../assets/woman.png";
import Nike from "../../assets/nike.png";
import Adidas from "../../assets/adidas.png";
import Zara from "../../assets/zara.png";
import Puma from "../../assets/puma.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: Men },
  { id: "women", label: "Women", icon: Woman },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Sneakers },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Nike },
  { id: "adidas", label: "Adidas", icon: Adidas },
  { id: "puma", label: "Puma", icon: Puma },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Zara },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentIcon, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentIcon.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt={index}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length // Muda para o próximo slide
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Ordenar por categoria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
