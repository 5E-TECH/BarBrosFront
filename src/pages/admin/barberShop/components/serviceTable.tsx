import { memo, useState, useEffect, useRef } from "react";
import { useService } from "../service/useService";
import { useParams } from "react-router-dom";
import { BASE_ASSETS_URL } from "../../../../shared/const";

const ServiceCard = ({ service }: any) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at first real image
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const price = service.barberShopServices?.[0]?.price || 0;
  const barberCount = service.barbers?.length || 0;

  // Process all images
  const processedImages = (service.serviceImages || [])
    .map((img: any) => {
      let imgUrl = img.image || "";
      if (imgUrl && !/^https?:\/\//.test(imgUrl)) {
        imgUrl = `${BASE_ASSETS_URL}${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
      }
      return imgUrl;
    })
    .filter(Boolean);

  const hasMultipleImages = processedImages.length > 1;

  // Create seamless loop: [last, ...originals, first]
  // This allows smooth transitions in both directions
  const carouselImages = hasMultipleImages
    ? [
        processedImages[processedImages.length - 1], // Clone of last
        ...processedImages, // Original images
        processedImages[0], // Clone of first
      ]
    : processedImages;

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [hasMultipleImages]);

  const handleNext = () => {
    if (!hasMultipleImages) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasMultipleImages) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!hasMultipleImages) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of cloned first image
  };

  // Handle the seamless loop
  useEffect(() => {
    if (!hasMultipleImages) return;

    const handleTransitionEnd = () => {
      const lastIndex = processedImages.length + 1;

      // If we're at the cloned last image (index 0), jump to real last
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(processedImages.length);
      }
      // If we're at the cloned first image (last position), jump to real first
      else if (currentIndex === lastIndex) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
    };

    // Clear any existing timeout
    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
    }

    // Set timeout for transition end
    if (isTransitioning) {
      transitionRef.current = setTimeout(() => {
        handleTransitionEnd();
      }, 500); // Match transition duration
    }

    return () => {
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }
    };
  }, [
    currentIndex,
    isTransitioning,
    processedImages.length,
    hasMultipleImages,
  ]);

  // Get display index for indicators
  const getDisplayIndex = () => {
    if (!hasMultipleImages) return 0;
    if (currentIndex === 0) return processedImages.length - 1;
    if (currentIndex === processedImages.length + 1) return 0;
    return currentIndex - 1;
  };

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Image with Overlay */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        {/* Images Carousel */}
        <div
          className={`flex h-full ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((img: string, index: number) => (
            <div key={index} className="w-full h-full shrink-0">
              <img
                src={
                  img ||
                  "https://via.placeholder.com/400x300?text=Service+Image"
                }
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {processedImages.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={(e) => goToSlide(index, e)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === getDisplayIndex()
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
          {/* Top Section - Duration and Barbers */}
          <div className="flex items-start justify-between">
            {/* Duration Badge */}
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-700">
                  {service.duration_minutes} min
                </span>
              </div>
            </div>

            {/* Barbers Badge */}
            <div className="bg-orange-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-xs font-semibold text-white">
                  {barberCount}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section - Service Info */}
          <div className="space-y-2">
            {/* Service Name */}
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {service.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/90 line-clamp-2 drop-shadow">
              {service.description || "Professional barber service"}
            </p>

            {/* Price */}
            <div className="inline-block bg-linear-to-r from-orange-500/80 to-orange-600/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
              <p className="text-xl font-bold text-white">
                {price.toLocaleString()} <span className="text-sm">UZS</span>
              </p>
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
};

const ServiceTable = () => {
  const { id } = useParams();

  const { getAllServicesByBarbershop } = useService();
  const { data } = getAllServicesByBarbershop(id);

  const services = data?.data || [];

  return (
    <div className="w-full px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Services Available
          </h3>
          <p className="text-gray-500">
            Check back later for available services
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ServiceTable);
