import { useEffect, useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const data = [
//   {
//     title: "Tech Startup XYZ Raises $10 Million in Series A Funding Round",
//     description:
//       "Tech Startup XYZ, known for its innovative AI-driven solutions, has successfully raised $10 million in its Series A funding round. The funding will be used to scale up operations and expand its market presence.",
//     pubDate: "21-3-2024 12:00:00",
//     image_url: "https://picsum.photos/200/300?random=1",
//   },
//   {
//     title: "New Startup Incubator Launched to Support Aspiring Entrepreneurs",
//     description:
//       "A new startup incubator has been launched in the heart of Silicon Valley, aimed at providing comprehensive support and resources to aspiring entrepreneurs. The incubator will offer mentorship, funding opportunities, and networking events.",
//     pubDate: "18-3-2024 09:45:00",
//     image_url: "https://picsum.photos/250/350?random=2",
//   },
//   {
//     title: "Startup Conference 2024: Bringing Together Visionaries and Innovators",
//     description:
//       "The Startup Conference 2024, one of the largest gatherings of visionaries and innovators in the startup ecosystem, is set to take place next month. The conference will feature keynote speeches, panel discussions, and networking opportunities.",
//     pubDate: "16-3-2024 15:30:00",
//     image_url: "https://picsum.photos/300/200?random=3",
//   },
//   {
//     title: "AI Startup Develops Breakthrough Healthcare Solution",
//     description:
//       "An AI startup has announced the development of a breakthrough healthcare solution aimed at revolutionizing patient care. The solution leverages machine learning algorithms to provide accurate diagnoses and personalized treatment recommendations.",
//     pubDate: "12-3-2024 08:20:00",
//     image_url: "https://picsum.photos/200/400?random=4",
//   },
//   {
//     title: "New Startup Unveils Sustainable Energy Innovation",
//     description:
//       "A new startup has unveiled an innovative sustainable energy solution that promises to address the world's growing energy needs while reducing environmental impact. The solution harnesses renewable energy sources and advanced technology.",
//     pubDate: "10-3-2024 14:10:00",
//     image_url: "https://picsum.photos/350/250?random=5",
//   },
//   {
//     title: "Startup Accelerator Program Accepting Applications",
//     description:
//       "A leading startup accelerator program is now accepting applications from aspiring entrepreneurs with innovative business ideas. Selected startups will receive mentorship, funding, and access to a network of investors and industry experts.",
//     pubDate: "5-3-2024 11:55:00",
//     image_url: "https://picsum.photos/270/380?random=6",
//   },
//   {
//     title: "Venture Capital Firm Launches $100 Million Startup Fund",
//     description:
//       "A prominent venture capital firm has announced the launch of a $100 million startup fund aimed at supporting early-stage companies with high growth potential. The fund will focus on sectors such as technology, healthcare, and fintech.",
//     pubDate: "1-3-2024 16:45:00",
//     image_url: "https://picsum.photos/320/280?random=7",
//   },
//   {
//     title: "Startup Innovation Summit 2024: Exploring the Future of Technology",
//     description:
//       "The Startup Innovation Summit 2024 is set to bring together industry leaders, entrepreneurs, and investors to explore the latest trends and innovations shaping the future of technology. The summit will feature keynote presentations, panel discussions, and networking sessions.",
//     pubDate: "25-2-2024 10:30:00",
//     image_url: "https://picsum.photos/290/210?random=8",
//   },
//   {
//     title: "HealthTech Startup Launches Telemedicine Platform for Remote Consultations",
//     description:
//       "A HealthTech startup has launched a telemedicine platform that enables remote consultations between patients and healthcare providers. The platform leverages video conferencing technology to facilitate virtual appointments, ensuring access to healthcare services from anywhere.",
//     pubDate: "20-2-2024 13:20:00",
//     image_url: "https://picsum.photos/220/330?random=9",
//   },
//   {
//     title: "Startup Funding Hits Record High in Q1 2024",
//     description:
//       "Startup funding reached a record high in the first quarter of 2024, with investors pouring billions of dollars into promising ventures across various sectors. The surge in funding reflects growing investor confidence in the potential of startups to drive innovation and economic growth.",
//     pubDate: "15-2-2024 09:15:00",
//     image_url: "https://picsum.photos/300/180?random=10",
//   },
// ];

export default function App() {
  const [delayOverlay, setDelayOverlay] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [atBottom, setAtBottom] = useState(false);
  const [bookmark, setBookmark] = useState([]);
  const [phone, setPhone] = useState(false);
  const [width, setScreenWidth] = useState(window.innerWidth);

  const fetchNews = async () => {
    try {
      if (nextPage) {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_397551e7494c4c7061e9656752c3260e6a423&q=startup&language=en&page=${nextPage}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNextPage(data.nextPage);
        setNewsData([...newsData, ...data.results]);
      } else {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_397551e7494c4c7061e9656752c3260e6a423&q=startup&language=en`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNextPage(data.nextPage);
        setNewsData(data.results);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 600) {
      setTimeout(() => {
        setDelayOverlay(false);
      }, 5000);
      fetchNews();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const isAtBottom = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    return scrollTop + clientHeight >= scrollHeight - 10;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isAtBottom()) {
        // Your logic here when reaching the bottom of the page
        setAtBottom(true);
        console.log("at the bottom");
        // fetchNews();
      } else {
        setAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {delayOverlay ? (
        <div className="container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={100}
            fill="white"
            className="icon">
            <path d="M.6 92.1C.6 58.8 27.4 32 60.4 32c30 0 54.5 21.9 59.2 50.2 32.6-7.6 67.1 .6 96.5 30l-44.3 44.3c-20.5-20.5-42.6-16.3-55.4-3.5-14.3 14.3-14.3 37.9 0 52.2l99.5 99.5-44 44.3c-87.7-87.2-49.7-49.7-99.8-99.7-26.8-26.5-35-64.8-24.8-98.9C20.4 144.6 .6 120.7 .6 92.1zm129.5 116.4l44.3 44.3c10-10 89.7-89.7 99.7-99.8 14.3-14.3 37.6-14.3 51.9 0 12.8 12.8 17 35-3.5 55.4l44 44.3c31.2-31.2 38.5-67.6 28.9-101.2 29.2-4.1 51.9-29.2 51.9-59.5 0-33.2-26.8-60.1-59.8-60.1-30.3 0-55.4 22.5-59.5 51.6-33.8-9.9-71.7-1.5-98.3 25.1-18.3 19.1-71.1 71.5-99.6 99.9zm266.3 152.2c8.2-32.7-.9-68.5-26.3-93.9-11.8-12.2 5 4.7-99.5-99.7l-44.3 44.3 99.7 99.7c14.3 14.3 14.3 37.6 0 51.9-12.8 12.8-35 17-55.4-3.5l-44 44.3c27.6 30.2 68 38.8 102.7 28 5.5 27.4 29.7 48.1 58.9 48.1 33 0 59.8-26.8 59.8-60.1 0-30.2-22.5-55-51.6-59.1zm-84.3-53.1l-44-44.3c-87 86.4-50.4 50.4-99.7 99.8-14.3 14.3-37.6 14.3-51.9 0-13.1-13.4-16.9-35.3 3.2-55.4l-44-44.3c-30.2 30.2-38 65.2-29.5 98.3-26.7 6-46.2 29.9-46.2 58.2C0 453.2 26.8 480 59.8 480c28.6 0 52.5-19.8 58.6-46.7 32.7 8.2 68.5-.6 94.2-26 32.1-32 12.2-12.4 99.5-99.7z" />
          </svg>
          <div className="text">TechShorts</div>
          <div className="text2">Made with ♥️ in India by Shubh Soni</div>
          {width < 600 ? (
            <div
              className="text2"
              style={{ width: "70vw", textAlign: "center", marginTop: "5rem" }}>
              This application is specifically made for Laptop/Computer, So kindly use laptop/computer to view the
              application
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <Feed
            newsData={newsData}
            setBookmark={setBookmark}></Feed>
          {atBottom ? (
            <div
              style={{
                position: "fixed",
                left: "45%",
                zIndex: "9999999",
                bottom: "6rem",
                color: "white",
                cursor: "pointer",
                display: "flex",
                border: "1px solid white",
                borderRadius: "2rem",
                flexDirection: "column",
                gap: "0px",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.2rem 1rem",
              }}
              onClick={() => {
                fetchNews();
                setAtBottom(false);
              }}>
              Load More
              <div class="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="white"
                  width={10}>
                  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

function Feed({ newsData, setBookmark }) {
  return (
    <div>
      <div
        style={{
          color: "black",
          position: "fixed",
          zIndex: "100000000",
          borderRadius: "100%",
          margin: "1rem",
          height: "2.5rem",
          width: "2.5rem",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          style={{ width: "1rem" }}>
          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
        </svg>
      </div>

      {newsData.map((el) => (
        <div style={{ backgroundColor: "#111111", height: "100vh" }}>
          <div style={{ width: "100%", position: "relative" }}>
            <div
              style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
              <img
                style={{
                  width: "auto",
                  overflow: "hidden",
                  height: "50vh",
                  position: "absolute",
                  right: "auto",
                  zIndex: "120",
                }}
                src={el.image_url}></img>
              <img
                style={{
                  width: "100%",
                  overflow: "hidden",
                  height: "50vh",
                  filter: "blur(30px) brightness(70%)",
                  zIndex: "100",
                }}
                src={el.image_url}
                on></img>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                zIndex: "1000",
                backgroundColor: "#111111",
                width: "10rem",
                fontSize: "1rem",
                color: "#A7A7B0",
                letterSpacing: "4px",
                fontWeight: "700",
                padding: "0.4rem",
                marginLeft: "5rem",
                borderRadius: "0.8rem 0.8rem 0px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              TechShorts
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#111111",
              height: "50%",
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              zIndex: "2000",
              position: "absolute",
              width: "100%",
              overflow: "hidden",
            }}>
            <div
              style={{
                fontSize: "2rem",
                color: "whitesmoke",
                opacity: "90%",
                letterSpacing: "2px",
                padding: "0rem 2rem",
                paddingTop: "2rem",
                width: "98%",
                marginRight: "2rem",
              }}>
              {el.title}
            </div>
            <p
              style={{
                fontSize: "1rem",
                color: "whitesmoke",
                opacity: "70%",
                letterSpacing: "2.3px",
                lineHeight: "1.5rem",
                marginBottom: "0",
                padding: "0rem 5rem 0rem 2rem",
                overflow: "hidden",
                display: "-webkit-box",
                maxWidth: "90%",
                maxHeight: "4.8rem",
              }}
              className="multi-line-ellipsis">
              {el.description}
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                color: "whitesmoke",
                opacity: "40%",
                letterSpacing: "2.3px",
                margin: "10px 0",
                padding: "0rem 2rem",
                cursor: "pointer",
              }}
              onClick={() => {
                window.open(el.link);
              }}>
              Know more →
            </p>
            <div
              style={{ margin: "1rem 2rem", cursor: "pointer" }}
              onClick={() => {
                setBookmark((data) => [...data, el]);
              }}>
              ✅
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "whitesmoke",
                opacity: "30%",
                lineHeight: "2.5rem",
                padding: "0rem 2rem",
              }}>
              {el.pubDate.split(" ")[0]}
            </p>
            <div>
              <ScrollButtons></ScrollButtons>
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: "1000",
                color: "white",
                height: "5rem",
                bottom: "0",
                overflow: "hidden",
                width: "100%", // Added width: 100% to cover the entire width
              }}>
              <img
                style={{
                  width: "100%",
                  overflow: "hidden",
                  height: "auto",
                  filter: "blur(50px)",
                  filter: "brightness(30%)",
                  zIndex: "100",
                  position: "absolute",
                }}
                src={el.image_url}
              />
              <div
                style={{
                  zIndex: "100000",
                  top: "50%", // Center vertically
                  left: "50%", // Center horizontally
                  position: "absolute",
                  width: "100%",
                  transform: "translate(-50%, -50%)", // Center the text container
                  textAlign: "center",
                }}>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "400",
                    color: "white",
                    letterSpacing: "3px",
                    marginBottom: "0.5rem",
                  }}>
                  Area for Ads
                </div>
                {/* <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "100",
                    color: "white",
                    letterSpacing: "3px",
                  }}>
                  Tap to explore printers for your home | ad
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScrollButtons() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const targetScroll = Math.max(0, Math.floor(currentScroll / viewportHeight)) * viewportHeight - 1;

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
      if (event.key === "ArrowDown") {
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const targetScroll = Math.ceil((currentScroll + viewportHeight) / viewportHeight) * viewportHeight - 1;

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const targetScroll = Math.ceil((currentScroll + viewportHeight) / viewportHeight) * viewportHeight - 1;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "1rem",
          bottom: "12rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px white solid",
          borderRadius: "100%",
          width: "2rem",
          height: "2rem",
        }}
        onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
          width={15}>
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
      <div
        style={{
          position: "fixed",
          right: "1rem",
          bottom: "15rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px white solid",
          borderRadius: "100%",
          width: "2rem",
          height: "2rem",
        }}
        onClick={() => {
          const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
          const targetScroll = Math.max(0, Math.floor(currentScroll / viewportHeight)) * viewportHeight - 1;

          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
          width={15}>
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
        </svg>
      </div>
    </>
  );
}
