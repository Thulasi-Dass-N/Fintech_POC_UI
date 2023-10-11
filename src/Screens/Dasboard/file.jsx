import React, { useEffect, useState } from "react";

import "./HomeScreen.css";

const CarouselScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [];

  useEffect(() => {
    const Interval = setTimeout(() => {
      const banner = data?.allStrapiGallery?.edges?.length;

      console.log(banner, "banner");

      if (banner - 1 !== activeIndex) {
        setActiveIndex(activeIndex + 1);
      } else if (banner - 1 === activeIndex) {
        setActiveIndex(0);
      }
    }, 5000);

    return () => {
      clearInterval(Interval);
    };
  }, [activeIndex, data?.allStrapiGallery?.edges?.length]);

  const navigateToSlide = (index) => {
    setActiveIndex(index);
  };

  console.log("data", data);

  console.log(data.allStrapiGallery.edges.length, "data");

  // console.log(data.allStrapiGallery.edges[0].node.carouselBanner[0].url);

  return (
    <div>
      <div className="custom-carousel" style={{ position: "relative" }}>
        {data.allStrapiGallery.edges.map((service, index) => (
          <div
            className="carousel-item"
            key={service.node.id}
            style={{
              display: activeIndex === index ? "flex" : "none",
            }}
          >
            <div className="left-content">
              <img src={service.node.image[0].url} alt={service.node.alt} />
            </div>

            <div className="right-content">
              <p>{service.node.subtitle}</p>

              <h2>{service.node.title}</h2>

              <p>{service.node.description.data.description}</p>

              <a href={service.node.link}>
                <button> know more</button>
              </a>

              {/* <p>{service.node.order}</p> */}
            </div>
          </div>
        ))}

        <div
          className=""
          style={{ position: "absolute", display: "flex", width: "80%" }}
        >
          {data.allStrapiGallery.edges.map((service, index) => (
            <>
              {activeIndex === index ? (
                <div
                  className="pro-title"
                  style={{
                    textAlign: "center",
                  }}
                >
                  {service.node.name}

                  <div
                    key={service.node.id}
                    className="progress2 progress-moved"
                  >
                    <div className="progress-bar2"></div>
                  </div>
                </div>
              ) : (
                <div
                  role="presentation"
                  onClick={() => navigateToSlide(index)}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {service.node.name}

                  <div
                    key={service.node.id}
                    className="progress2 progress-moved"
                    style={{
                      height: "3px",
                    }}
                  >
                    {/* <div className="progress-bar2"></div> */}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselScreen;
