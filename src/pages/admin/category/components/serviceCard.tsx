import { memo, useState, useEffect } from "react";
import { BASE_ASSETS_URL } from "../../../../shared/const";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }: any) => {
  const navigate = useNavigate()
  // Process all images first
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
  const [currentIndex, setCurrentIndex] = useState(hasMultipleImages ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const barberCount = service.barbers?.length || 0;

  // Create seamless loop: [last, ...originals, first]
  const carouselImages = hasMultipleImages
    ? [
        processedImages[processedImages.length - 1],
        ...processedImages,
        processedImages[0],
      ]
    : processedImages;

  // Handle the seamless loop
  useEffect(() => {
    if (!hasMultipleImages || !isTransitioning) return;

    const handleTransitionEnd = () => {
      const lastIndex = processedImages.length + 1;
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(processedImages.length);
      } else if (currentIndex === lastIndex) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
    };

    const timeout = setTimeout(() => {
      handleTransitionEnd();
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentIndex, isTransitioning, processedImages.length, hasMultipleImages]);

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
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
    setCurrentIndex(index + 1);
  };

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
            <div onClick={() => navigate(`/category/service-detail/${service.id}`)} key={index} className="w-full h-full shrink-0">
              <img
                src={img || "https://via.placeholder.com/400x300?text=Service+Image"}
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {processedImages.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={(e) => goToSlide(index, e)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === getDisplayIndex() ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Dark linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
          {/* Top Section - Duration and Barbers */}
          <div className="flex items-start justify-between">
            {/* Duration Badge */}
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">{service.duration_minutes} min</span>
              </div>
            </div>

            {/* Barbers Badge */}
            {barberCount > 0 && (
              <div className="bg-orange-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-semibold text-white">{barberCount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Section - Service Info */}
          <div className="space-y-2">
            {/* Service Name */}
            <h3 className="text-xl font-bold text-white drop-shadow-lg">{service.name}</h3>

            {/* Description */}
            <p className="text-sm text-white/90 line-clamp-2 drop-shadow">
              {service.description || "Professional barber service"}
            </p>
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

const CategorySection = ({
  title,
  services,
  icon,
}: {
  title: string;
  services: any[];
  icon: React.ReactNode;
}) => {
  if (services.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <span className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {services.length}
          </span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ServiceTableProps {
  services?: any[];
  isLoading?: boolean;
}

const ServiceTable = ({ services = [], isLoading = false }: ServiceTableProps) => {
  // Group services by category
  const groupedByCategory = services.reduce((acc: any, service: any) => {
    const categoryName = service.category?.name || "Other";
    
    if (!acc[categoryName]) {
      acc[categoryName] = {
        services: [],
      };
    }
    acc[categoryName].services.push(service);
    return acc;
  }, {});

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full px-4 py-6">
        {/* Category Skeleton 1 */}
        <div className="mb-12">
          {/* Section Header Skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Service Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-md bg-gray-100 animate-pulse"
              >
                <div className="relative h-64 bg-gray-200">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  
                  {/* Top badges skeleton */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="bg-white/50 px-3 py-1.5 rounded-full w-20 h-7"></div>
                    <div className="bg-gray-300/50 px-3 py-1.5 rounded-full w-12 h-7"></div>
                  </div>

                  {/* Bottom content skeleton */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="h-6 bg-white/30 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-full"></div>
                    <div className="h-4 bg-white/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Skeleton 2 */}
        <div className="mb-12">
          {/* Section Header Skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Service Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-md bg-gray-100 animate-pulse"
              >
                <div className="relative h-64 bg-gray-200">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
                  
                  {/* Top badges skeleton */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="bg-white/50 px-3 py-1.5 rounded-full w-20 h-7"></div>
                    <div className="bg-gray-300/50 px-3 py-1.5 rounded-full w-12 h-7"></div>
                  </div>

                  {/* Bottom content skeleton */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="h-6 bg-white/30 rounded w-3/4"></div>
                    <div className="h-4 bg-white/20 rounded w-full"></div>
                    <div className="h-4 bg-white/20 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Render each category section */}
      {Object.entries(groupedByCategory).map(([categoryName, categoryData]: [string, any]) => (
        <CategorySection
          key={categoryName}
          title={categoryName}
          services={categoryData.services}
          icon={
            <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
          }
        />
      ))}

      {/* Empty State */}
      {services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Available</h3>
          <p className="text-gray-500">Check back later for available services</p>
        </div>
      )}
    </div>
  );
};

export default memo(ServiceTable);