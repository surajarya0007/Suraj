"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingAnimation() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path");

    // Set up stroke properties for each path so the animation works
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // Make the SVG visible once GSAP has set up the paths
    gsap.set(svgRef.current, { visibility: "visible" });

    // Timeline: first draw the paths, then blur and fade out the entire container
    gsap
      .timeline({ delay: 0.5 })
      .to(paths, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.3,
      })
      .to(containerRef.current, {
        filter: "blur(20px)",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
  }, []);

  return (
    <section
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* 
        Wrap the SVG in a div with responsive width.
        Adjust w-[90vw] and md:w-[70vw] as needed to match your hero text scaling.
      */}
      <div className=" w-[75vw] md:w-[100vw] h-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 300"
          style={{ visibility: "hidden" }}
          className="w-full h-auto "
        >
          <g fill="none" stroke="#ffffff" strokeWidth="2">
            {/* Group for "S" */}
            <g id="S" transform="translate(160,18)">
              <path d="M 64.8 186.9 L 64.8 186 Q 64.8 177.6 60.45 170.4 A 92.316 92.316 0 0 0 54.844 162.205 A 119.595 119.595 0 0 0 49.5 155.7 A 254.633 254.633 0 0 1 41.191 145.739 A 304.093 304.093 0 0 1 36.15 139.2 A 103.796 103.796 0 0 1 27.622 125.704 A 124.901 124.901 0 0 1 24.15 118.65 A 73.367 73.367 0 0 1 19.63 105.235 A 101.321 101.321 0 0 1 17.4 91.5 Q 17.1 89.7 17.1 87.9 L 17.1 84.3 A 73.165 73.165 0 0 1 20.847 60.651 A 67.063 67.063 0 0 1 25.8 49.5 Q 34.5 33.9 48.45 22.65 Q 62.4 11.4 78.6 5.1 A 71.509 71.509 0 0 1 95.188 0.842 A 93.862 93.862 0 0 1 108 0 A 71.781 71.781 0 0 1 116.619 0.501 A 62.717 62.717 0 0 1 119.4 0.9 A 67.186 67.186 0 0 1 127.584 2.944 Q 137.072 6.01 141.6 11.4 Q 147.9 18.9 147.9 26.4 Q 147.9 32.1 144.9 36.6 A 45.234 45.234 0 0 1 143.838 38.13 Q 141.759 40.986 140.777 41.096 A 0.69 0.69 0 0 1 140.7 41.1 Q 139.917 41.1 139.815 40.192 A 2.625 2.625 0 0 1 139.8 39.9 Q 139.8 39.31 140.235 37.995 A 20.986 20.986 0 0 1 140.25 37.95 A 23.352 23.352 0 0 0 140.913 35.519 A 26.089 26.089 0 0 0 141 35.1 Q 141.9 32.7 142.2 30.9 Q 142.5 29.1 142.5 27.3 Q 142.5 18.938 135.785 14.332 A 21.207 21.207 0 0 0 133.65 13.05 Q 124.8 8.4 114.9 8.4 L 112.2 8.4 Q 110.7 8.4 109.2 8.7 A 86.164 86.164 0 0 0 74.026 22.156 A 98.967 98.967 0 0 0 73.5 22.5 A 97.76 97.76 0 0 0 45.512 50.894 A 111.621 111.621 0 0 0 45.15 51.45 A 100.834 100.834 0 0 0 31.669 83.75 A 120.402 120.402 0 0 0 30 92.4 Q 29.7 94.5 29.55 96.6 A 60.896 60.896 0 0 0 29.429 98.868 A 48.11 48.11 0 0 0 29.4 100.5 A 57.308 57.308 0 0 0 31.984 117.908 A 51.762 51.762 0 0 0 35.4 126.15 Q 41.4 137.7 49.65 147.6 Q 57.9 157.5 65.4 166.65 A 65.138 65.138 0 0 1 71.044 174.628 Q 73.796 179.259 75.302 183.851 A 39.281 39.281 0 0 1 75.6 184.8 Q 81.6 183.6 87.3 183.3 Q 93 183 98.4 183.3 A 15.336 15.336 0 0 1 99.827 183.568 Q 102.6 184.238 102.6 185.7 A 1.14 1.14 0 0 1 101.977 186.674 Q 100.927 187.336 98.109 187.468 A 32.427 32.427 0 0 1 96.6 187.5 Q 92.4 187.5 87.3 187.95 A 60.059 60.059 0 0 0 80.691 188.923 A 74.286 74.286 0 0 0 76.5 189.9 A 5.669 5.669 0 0 1 76.8 191.672 A 5.403 5.403 0 0 1 76.8 191.7 L 76.8 193.2 A 22.373 22.373 0 0 1 76.412 197.267 A 27.43 27.43 0 0 1 75.9 199.5 A 33.077 33.077 0 0 1 70.752 209.507 A 28.921 28.921 0 0 1 61.8 217.2 Q 51.6 222.9 41.1 222.9 A 41.015 41.015 0 0 1 33.426 222.22 Q 28.787 221.337 25.049 219.304 A 24.85 24.85 0 0 1 24 218.7 A 16.676 16.676 0 0 1 20.569 216.394 A 19.739 19.739 0 0 1 19.5 215.4 Q 15.6 217.5 11.55 220.2 Q 7.5 222.9 3.6 225.6 Q 2.4 226.5 1.5 226.5 Q 0 226.5 0 224.1 Q 0 222.011 1.485 219.03 A 23.79 23.79 0 0 1 1.5 219 A 14.447 14.447 0 0 1 3.472 216.005 A 12.251 12.251 0 0 1 5.4 214.2 Q 7.8 212.7 10.35 211.05 A 55.491 55.491 0 0 1 13.479 209.164 A 46.058 46.058 0 0 1 15.3 208.2 A 2.01 2.01 0 0 1 15.158 207.805 Q 15 207.19 15 206.1 Q 15 204.47 15.692 203.947 A 1.302 1.302 0 0 1 16.5 203.7 A 1.234 1.234 0 0 1 17.022 203.839 Q 17.862 204.24 19.2 205.8 A 228.197 228.197 0 0 1 45.145 193.471 A 182.128 182.128 0 0 1 64.8 186.9 Z" />
            </g>
            <g id="U" transform="translate(250,-10)">
              <path d="M 7.281 260.19 A 13.839 13.839 0 0 0 18.3 265.5 A 22.25 22.25 0 0 0 24.612 264.518 Q 27.541 263.651 30.724 262.019 A 56.758 56.758 0 0 0 36.9 258.3 Q 42.97 254.137 49.291 248.22 A 160.536 160.536 0 0 0 58.65 238.65 A 237.736 237.736 0 0 0 67.024 228.848 A 288.723 288.723 0 0 0 80.7 210.45 Q 91.5 194.7 100.65 177.15 Q 109.8 159.6 115.8 142.5 Q 113.4 155.1 111.15 171.6 Q 108.9 188.1 108.9 204 A 142.608 142.608 0 0 0 109.216 213.626 A 115.267 115.267 0 0 0 111.15 228.45 A 55.291 55.291 0 0 0 111.503 230.086 Q 112.511 234.436 114.115 238.046 A 30.661 30.661 0 0 0 119.4 246.3 A 20.018 20.018 0 0 0 121.488 248.318 A 15.367 15.367 0 0 0 125.25 250.65 A 18.207 18.207 0 0 0 127.204 251.362 A 14.594 14.594 0 0 0 131.4 252 A 21.489 21.489 0 0 0 141.791 249.237 A 31.666 31.666 0 0 0 147.6 245.1 A 79.897 79.897 0 0 0 149.373 243.484 Q 152.443 240.6 154.832 237.715 A 44.238 44.238 0 0 0 159.3 231.3 A 107.157 107.157 0 0 1 159.503 230.946 Q 160.417 229.361 162.218 226.343 A 1153.525 1153.525 0 0 1 163.65 223.95 Q 166.8 218.7 169.8 212.7 Q 172.8 206.7 173.7 202.8 A 6.104 6.104 0 0 0 173.785 202.574 Q 174.266 201.22 173.85 200.25 Q 173.4 199.2 172.2 199.2 A 1.951 1.951 0 0 0 171.422 199.377 Q 169.518 200.206 166.8 204.9 L 161.55 214.35 A 163.148 163.148 0 0 1 158.01 220.4 A 207.824 207.824 0 0 1 152.7 228.6 Q 147.6 236.1 142.05 241.5 Q 138.928 244.537 135.949 245.866 A 11.114 11.114 0 0 1 131.4 246.9 A 7.029 7.029 0 0 1 130.522 246.845 Q 127.981 246.525 125.55 244.35 Q 123.502 242.517 121.841 238.747 A 37.427 37.427 0 0 1 120.6 235.5 A 20.502 20.502 0 0 1 120.152 234.054 Q 119.239 230.694 118.942 225.689 A 88.112 88.112 0 0 1 118.8 220.5 Q 118.8 212.198 119.868 201.524 A 339.102 339.102 0 0 1 121.5 188.1 Q 124.2 168.9 128.7 147.3 Q 133.2 125.7 139.35 104.85 Q 142.437 94.384 145.637 85.09 A 334.886 334.886 0 0 1 152.1 67.8 A 69.907 69.907 0 0 0 152.745 66.302 Q 154.627 61.788 155.4 58.05 Q 156.3 53.7 156.3 50.4 Q 156.3 47.067 155.5 44.82 A 7.809 7.809 0 0 0 154.2 42.45 Q 152.1 39.9 149.1 39.9 Q 146.831 39.9 144.563 41.389 A 14.647 14.647 0 0 0 142.5 43.05 Q 139.2 46.2 138 51.6 Q 135 68.1 129 87 Q 123 105.9 115.35 125.1 A 697.163 697.163 0 0 1 115.32 125.175 A 629.478 629.478 0 0 1 99.3 162 Q 90.9 179.7 82.95 193.8 Q 75 207.9 68.7 216.6 A 238.305 238.305 0 0 1 65.038 221.686 A 276.869 276.869 0 0 1 54.6 234.9 A 184.241 184.241 0 0 1 54.105 235.487 Q 46.567 244.4 39.45 250.5 A 47.274 47.274 0 0 1 39.171 250.738 Q 34.847 254.386 30.994 255.839 A 13.855 13.855 0 0 1 26.1 256.8 A 7.525 7.525 0 0 1 21.508 255.249 Q 19.099 253.459 17.25 249.6 A 23.584 23.584 0 0 1 15.842 245.735 Q 13.8 238.386 13.8 225 Q 13.8 201 19.05 176.55 Q 24.3 152.1 31.35 127.8 A 907.064 907.064 0 0 0 33.084 121.744 A 821.888 821.888 0 0 0 43.65 80.4 Q 48.9 57.3 48.9 36.3 A 66.289 66.289 0 0 0 48.67 30.878 A 83.645 83.645 0 0 0 47.7 23.4 A 55.091 55.091 0 0 0 47.691 23.346 A 49.779 49.779 0 0 0 43.65 10.5 A 22.395 22.395 0 0 0 42.798 8.878 A 17.491 17.491 0 0 0 35.4 1.8 A 14.277 14.277 0 0 0 35.189 1.676 A 12.01 12.01 0 0 0 29.1 0 A 14.896 14.896 0 0 0 21.812 1.946 A 21.471 21.471 0 0 0 17.7 4.95 Q 12.3 9.9 9.3 16.65 Q 6.3 23.4 6.9 28.8 A 3.843 3.843 0 0 0 6.91 29.092 Q 7.022 30.559 8.369 29.045 A 9.982 9.982 0 0 0 8.7 28.65 L 13.5 22.65 Q 16.5 18.9 20.1 15.75 A 14.681 14.681 0 0 1 22.668 13.924 A 10.098 10.098 0 0 1 27.6 12.6 A 6.894 6.894 0 0 1 31.652 13.814 Q 32.961 14.728 33.94 16.332 A 14.422 14.422 0 0 1 35.25 19.2 A 34.679 34.679 0 0 1 36.113 22.174 Q 37.5 27.862 37.5 35.4 Q 37.5 45 35.85 56.55 Q 34.2 68.1 31.95 79.05 Q 30.684 85.209 29.466 90.514 A 339.042 339.042 0 0 1 27.6 98.25 A 2319.348 2319.348 0 0 1 27.275 99.524 Q 25.429 106.761 24.6 109.8 A 546.53 546.53 0 0 0 23.384 113.811 Q 21.251 120.94 18.15 131.85 Q 14.1 146.1 9.9 163.2 Q 5.7 180.3 2.85 197.55 A 264.114 264.114 0 0 0 2.105 202.327 Q 0 216.698 0 228.3 Q 0 248.1 4.95 256.8 A 22.779 22.779 0 0 0 7.281 260.19 Z" />
            </g>
            {/* Group for "R" */}
            <g id="R" transform="translate(425,5)">
              <path d="M 130.5 158.401 L 135 139.801 A 4.019 4.019 0 0 1 134.453 139.654 Q 133.5 139.318 133.5 138.601 Q 133.5 137.267 135.398 135.933 A 11.159 11.159 0 0 1 135.9 135.601 A 342.824 342.824 0 0 0 141.389 104.289 A 316.695 316.695 0 0 0 141.45 103.801 Q 143.4 88.201 143.4 75.001 A 138.693 138.693 0 0 0 142.912 63.061 Q 142.402 57.17 141.36 51.999 A 80.504 80.504 0 0 0 140.85 49.651 A 48.541 48.541 0 0 0 138.725 42.743 Q 137.309 39.18 135.415 36.413 A 23.902 23.902 0 0 0 132.6 33.001 Q 130.2 30.601 127.2 30.601 A 8.2 8.2 0 0 0 124.653 31.024 A 11.217 11.217 0 0 0 122.85 31.801 A 23.613 23.613 0 0 0 119.293 34.147 A 26.904 26.904 0 0 0 118.5 34.801 A 12.916 12.916 0 0 1 118.206 35.087 Q 116.609 36.585 117.903 34.036 A 25.068 25.068 0 0 1 118.05 33.751 A 18.378 18.378 0 0 1 119.468 31.497 Q 120.28 30.379 121.351 29.18 A 45.913 45.913 0 0 1 123.75 26.701 A 15.426 15.426 0 0 1 127.027 24.25 A 11.442 11.442 0 0 1 132.6 22.801 A 8.746 8.746 0 0 1 136.057 23.539 A 12.009 12.009 0 0 1 138 24.601 A 32.345 32.345 0 0 1 148.21 36.235 A 45.736 45.736 0 0 1 151.65 44.701 Q 155.447 57.357 155.684 73.705 A 151.306 151.306 0 0 1 155.7 75.901 A 204.08 204.08 0 0 1 154.925 93.34 A 238.787 238.787 0 0 1 154.2 100.501 A 325.821 325.821 0 0 1 150.333 125.216 A 355.94 355.94 0 0 1 150 126.901 A 5.145 5.145 0 0 1 150.659 127.718 A 6.697 6.697 0 0 1 151.05 128.401 A 16.513 16.513 0 0 0 151.934 129.948 A 18.447 18.447 0 0 0 152.1 130.201 A 414.553 414.553 0 0 0 176.35 121.598 Q 187.586 117.188 196.971 112.582 A 184.525 184.525 0 0 0 210.45 105.301 A 167.861 167.861 0 0 0 223.911 96.398 Q 235.876 87.566 242.55 78.601 A 62.463 62.463 0 0 0 248.272 69.462 Q 250.968 64.11 251.985 58.96 A 31.75 31.75 0 0 0 252.6 52.801 A 32.259 32.259 0 0 0 244.716 31.637 A 42.424 42.424 0 0 0 243 29.701 A 55.54 55.54 0 0 0 230.977 20.174 Q 224.606 16.36 216.6 13.501 Q 199.8 7.501 177.9 7.501 Q 157.5 7.501 135.6 13.201 Q 115.8 18.601 97.95 28.951 A 195.225 195.225 0 0 0 74.305 44.992 A 170.453 170.453 0 0 0 66.15 51.901 A 177.491 177.491 0 0 0 54.258 63.648 Q 48.595 69.827 44.26 75.933 A 106.527 106.527 0 0 0 43.65 76.801 A 83.896 83.896 0 0 0 39.024 84.196 Q 34.725 92.007 33.9 98.401 Q 33.407 103.829 32.203 106.822 A 10.843 10.843 0 0 1 31.65 108.001 Q 30.541 110.017 29.5 110.679 A 1.86 1.86 0 0 1 28.5 111.001 A 3.314 3.314 0 0 1 25.545 109.149 Q 24.067 106.643 24.003 100.746 A 49.881 49.881 0 0 1 24 100.201 Q 24 98.701 24.15 97.201 Q 24.3 95.701 24.6 94.201 A 49.247 49.247 0 0 1 29.304 79.066 Q 32.021 73.504 36.188 67.943 A 84.226 84.226 0 0 1 36.75 67.201 A 118.683 118.683 0 0 1 51.05 51.751 A 151.593 151.593 0 0 1 63.15 41.851 A 219.494 219.494 0 0 1 93.649 23.066 A 244.463 244.463 0 0 1 98.4 20.701 A 217.836 217.836 0 0 1 130.8 7.997 A 197.016 197.016 0 0 1 136.8 6.301 Q 149.1 3.001 160.95 1.501 A 185.941 185.941 0 0 1 180.413 0.038 A 166.926 166.926 0 0 1 183.9 0.001 A 152.129 152.129 0 0 1 205.429 1.451 A 110.647 110.647 0 0 1 226.8 6.601 A 91.403 91.403 0 0 1 240.576 12.731 Q 247.961 16.826 253.462 22.004 A 53.389 53.389 0 0 1 255.9 24.451 A 39.853 39.853 0 0 1 263.608 36.089 A 35.539 35.539 0 0 1 266.4 50.101 A 36.861 36.861 0 0 1 264.288 62.078 Q 262.673 66.795 259.821 71.717 A 72.768 72.768 0 0 1 257.4 75.601 A 73.359 73.359 0 0 1 248.721 86.148 Q 243.938 91.032 237.741 95.917 A 164.091 164.091 0 0 1 228.6 102.601 A 183.988 183.988 0 0 1 211.978 112.599 Q 202.877 117.484 192.041 122.245 A 393.619 393.619 0 0 1 176.4 128.701 Q 169.8 131.101 164.55 132.901 Q 159.3 134.701 155.1 136.201 A 270.472 270.472 0 0 0 160.106 144.807 Q 164.7 152.401 170.7 161.401 A 678.853 678.853 0 0 0 189.887 188.665 A 739.895 739.895 0 0 0 191.25 190.501 A 400.595 400.595 0 0 0 204.879 207.821 A 330.897 330.897 0 0 0 213 217.201 Q 223.8 229.201 232.5 235.501 A 103.934 103.934 0 0 0 238.189 239.314 Q 241.051 241.107 244.311 242.93 A 170.42 170.42 0 0 0 245.25 243.451 A 35.501 35.501 0 0 0 251.595 246.22 A 25.957 25.957 0 0 0 259.5 247.501 Q 264.605 247.501 267.903 245.449 A 10.812 10.812 0 0 0 270 243.751 Q 273.6 240.001 275.1 234.301 Q 276.6 228.601 276.6 222.901 Q 276.6 203.401 265.2 186.901 Q 264.343 185.472 264.302 185.132 A 0.264 0.264 0 0 1 264.3 185.101 A 1.296 1.296 0 0 1 264.345 184.745 Q 264.459 184.346 264.867 184.239 A 1.326 1.326 0 0 1 265.2 184.201 A 3.074 3.074 0 0 1 266.719 184.628 Q 267.694 185.177 268.669 186.429 A 12.07 12.07 0 0 1 268.8 186.601 Q 274.8 193.801 278.4 203.401 A 55.33 55.33 0 0 1 281.873 219.001 A 51.311 51.311 0 0 1 282 222.601 A 41.87 41.87 0 0 1 280.244 234.968 A 34.633 34.633 0 0 1 273.45 247.351 A 27.997 27.997 0 0 1 254.213 257.202 A 39.481 39.481 0 0 1 250.2 257.401 Q 234.9 257.401 221.85 249.001 A 95.676 95.676 0 0 1 205.194 235.276 A 118.027 118.027 0 0 1 197.7 226.801 Q 186.6 213.001 177.6 196.951 A 382.745 382.745 0 0 1 164.361 171.167 A 341.796 341.796 0 0 1 161.7 165.301 Q 155.77 151.895 151.17 141.147 A 1459.109 1459.109 0 0 1 149.7 137.701 L 147.6 138.301 Q 142.8 159.001 136.65 178.501 Q 130.5 198.001 123.9 213.901 Q 115.8 233.701 103.05 250.951 Q 90.3 268.201 75.45 278.701 A 65.317 65.317 0 0 1 64.032 285.252 Q 56.297 288.646 48.687 289.123 A 39.725 39.725 0 0 1 46.2 289.201 A 33.143 33.143 0 0 1 30.192 284.974 A 45.379 45.379 0 0 1 23.7 280.651 A 45.029 45.029 0 0 1 15.72 272.301 Q 12.421 267.906 9.475 262.225 A 108.109 108.109 0 0 1 5.1 252.601 Q 2.4 245.701 1.2 238.201 Q 0 230.701 0 223.201 Q 0 210.901 2.7 198.601 A 160.168 160.168 0 0 1 7.834 180.298 A 141.766 141.766 0 0 1 9.6 175.501 Q 12.363 168.969 17.02 161.07 A 192.04 192.04 0 0 1 18.9 157.951 A 171.493 171.493 0 0 1 23.316 151.124 Q 26.925 145.839 30.3 141.901 A 49.925 49.925 0 0 1 31.777 140.488 Q 32.612 139.719 33.584 138.881 A 97.016 97.016 0 0 1 34.8 137.851 A 33.863 33.863 0 0 1 35.749 137.086 Q 37.205 135.96 37.978 135.688 A 1.307 1.307 0 0 1 38.4 135.601 A 0.432 0.432 0 0 1 38.519 135.616 Q 38.652 135.654 38.687 135.79 A 0.442 0.442 0 0 1 38.7 135.901 A 1.373 1.373 0 0 1 38.522 136.427 Q 37.888 137.695 35.005 141.345 A 187.607 187.607 0 0 1 33.6 143.101 Q 21.3 158.101 15.45 177.151 A 130.212 130.212 0 0 0 9.806 207.81 A 119.264 119.264 0 0 0 9.6 214.801 Q 9.6 225.901 11.55 236.101 A 119.315 119.315 0 0 0 14.824 249.274 A 101.342 101.342 0 0 0 16.8 255.001 A 110.078 110.078 0 0 0 20.633 263.648 Q 24.873 272.132 29.546 276.914 A 29.35 29.35 0 0 0 30.45 277.801 A 29.632 29.632 0 0 0 35.83 281.869 Q 40.711 284.701 45.9 284.701 A 26.603 26.603 0 0 0 56.741 282.282 Q 60.413 280.655 64.123 277.936 A 53.026 53.026 0 0 0 66.6 276.001 A 94.649 94.649 0 0 0 76.345 266.592 Q 81.811 260.551 87.15 252.901 A 272.173 272.173 0 0 0 103.148 226.892 A 305.178 305.178 0 0 0 105.9 221.701 A 341.201 341.201 0 0 0 120.235 190.333 A 313.545 313.545 0 0 0 121.05 188.251 Q 127.5 171.601 130.5 158.401 Z" />
            </g>
            {/* Group for "A" */}
            <g id="A" transform="translate(680,0)">
              <path d="M 155.691 3.828 L 155.391 3.828 Q 153.76 3.828 153.238 3.136 A 1.302 1.302 0 0 1 152.991 2.328 A 1.452 1.452 0 0 1 153.565 1.188 Q 154.303 0.566 155.991 0.228 A 42.612 42.612 0 0 1 158.64 0.033 Q 170.931 -0.476 176.091 7.128 A 30.692 30.692 0 0 1 180.275 16.533 Q 181.365 20.615 181.671 25.439 A 61.384 61.384 0 0 1 181.791 29.328 Q 181.791 31.728 181.641 34.428 A 123.278 123.278 0 0 1 181.364 38.283 A 144.956 144.956 0 0 1 181.191 40.128 A 5.508 5.508 0 0 1 182.476 41.731 Q 182.893 42.49 183.188 43.465 A 14.171 14.171 0 0 1 183.591 45.228 Q 185.391 54.828 187.341 70.428 Q 189.291 86.028 191.991 104.628 Q 194.691 123.228 198.441 142.278 A 349.043 349.043 0 0 0 204.306 167.338 A 297.591 297.591 0 0 0 207.441 177.978 A 149.855 149.855 0 0 0 212.408 191.542 Q 215.197 198.102 218.394 203.565 A 85.007 85.007 0 0 0 219.891 206.028 A 70.144 70.144 0 0 0 220.946 207.66 Q 222.149 209.471 223.847 211.839 A 224.755 224.755 0 0 0 224.091 212.178 A 32.179 32.179 0 0 0 230.178 218.527 A 36.155 36.155 0 0 0 230.691 218.928 Q 234.591 221.928 239.391 221.928 Q 244.491 221.928 249.891 217.728 A 33.609 33.609 0 0 0 254.259 213.413 Q 256.191 211.145 258.013 208.328 A 60.296 60.296 0 0 0 258.891 206.928 A 143.868 143.868 0 0 0 265.782 194.164 A 158.145 158.145 0 0 0 266.691 192.228 A 16.607 16.607 0 0 1 267.41 191.024 Q 268.66 189.134 269.755 188.948 A 1.414 1.414 0 0 1 269.991 188.928 A 2.183 2.183 0 0 1 271.79 189.818 A 3.731 3.731 0 0 1 272.241 190.578 A 6.274 6.274 0 0 1 272.642 191.733 Q 272.777 192.306 272.777 192.859 A 4.422 4.422 0 0 1 272.691 193.728 Q 271.885 196.349 269.927 199.578 A 52.684 52.684 0 0 1 267.741 202.878 A 115.864 115.864 0 0 1 262.273 209.96 A 99.857 99.857 0 0 1 260.091 212.478 Q 256.905 216.032 254.72 217.884 A 20.079 20.079 0 0 1 253.791 218.628 A 52.78 52.78 0 0 1 249.152 221.873 Q 246.225 223.681 243.441 224.778 A 30.954 30.954 0 0 1 239.253 226.111 Q 236.978 226.651 234.885 226.719 A 18.444 18.444 0 0 1 234.291 226.728 A 22.915 22.915 0 0 1 217.97 220.005 A 30.52 30.52 0 0 1 217.041 219.078 A 106.345 106.345 0 0 1 205.147 204.336 A 97.98 97.98 0 0 1 204.291 203.028 A 80.144 80.144 0 0 1 198.141 190.86 Q 195.65 184.767 193.689 177.614 A 147.524 147.524 0 0 1 192.441 172.728 A 308.887 308.887 0 0 1 187.765 148.681 A 375.773 375.773 0 0 1 185.691 133.128 Q 183.291 111.828 181.941 91.128 Q 180.591 70.428 179.091 53.328 A 265.52 265.52 0 0 1 172.172 79.035 A 304.115 304.115 0 0 1 169.191 87.828 Q 162.891 105.528 156.441 120.378 Q 149.991 135.228 145.791 143.328 Q 139.191 156.828 131.391 170.328 Q 145.191 167.028 160.191 164.328 A 1156.27 1156.27 0 0 0 172.627 162.023 Q 180.178 160.578 186.591 159.228 L 187.491 159.228 A 2.352 2.352 0 0 1 187.925 159.265 Q 188.647 159.401 188.688 160.048 A 1.262 1.262 0 0 1 188.691 160.128 A 1.535 1.535 0 0 1 188.566 160.699 Q 188.257 161.462 187.191 162.528 A 7.592 7.592 0 0 1 184.72 164.159 A 9.953 9.953 0 0 1 183.291 164.628 Q 170.391 167.028 155.391 170.178 A 522.73 522.73 0 0 0 137.344 174.292 A 440.559 440.559 0 0 0 127.191 176.928 A 947.217 947.217 0 0 1 106.322 211.128 A 851.212 851.212 0 0 1 99.291 221.928 A 239.232 239.232 0 0 1 75.612 252.28 A 213.019 213.019 0 0 1 68.391 259.728 A 67.628 67.628 0 0 0 77.827 261.922 Q 82.665 262.713 88.282 263.059 A 149.99 149.99 0 0 0 97.491 263.328 L 98.091 263.328 Q 100.491 263.328 100.491 264.528 A 1.437 1.437 0 0 1 99.605 265.871 Q 98.905 266.227 97.653 266.306 A 12.119 12.119 0 0 1 96.891 266.328 A 104.178 104.178 0 0 1 93.172 266.395 A 99.325 99.325 0 0 1 80.391 265.578 A 98.983 98.983 0 0 1 70.735 263.856 A 82.163 82.163 0 0 1 65.391 262.428 A 161.921 161.921 0 0 1 51.324 274.738 A 124.903 124.903 0 0 1 38.841 283.278 A 76.907 76.907 0 0 1 27.562 288.864 Q 20.895 291.474 14.509 292.281 A 46.696 46.696 0 0 1 13.191 292.428 Q 6.591 292.728 2.841 290.028 A 6.409 6.409 0 0 1 0.469 286.628 Q -0.358 283.992 0.273 279.943 A 27.738 27.738 0 0 1 0.291 279.828 A 4.025 4.025 0 0 1 0.338 279.255 Q 0.428 278.636 0.691 277.757 A 21.661 21.661 0 0 1 0.891 277.128 A 8.604 8.604 0 0 1 1.241 276.234 Q 1.662 275.325 2.198 274.874 A 2.15 2.15 0 0 1 2.391 274.728 A 46.902 46.902 0 0 0 2.357 275.984 Q 2.283 281.625 3.718 284.436 A 6.658 6.658 0 0 0 4.191 285.228 A 6.658 6.658 0 0 0 7.93 287.824 Q 9.328 288.228 11.091 288.228 A 40.605 40.605 0 0 0 24.491 285.855 Q 29.794 284.01 35.241 280.728 A 110.232 110.232 0 0 0 48.813 271 A 147.452 147.452 0 0 0 59.991 260.628 Q 56.991 259.728 52.341 257.178 Q 48.508 255.077 46.204 253.688 A 66.085 66.085 0 0 1 45.291 253.128 A 37.514 37.514 0 0 1 39.224 247.725 Q 35.747 243.81 34.308 239.437 A 20.367 20.367 0 0 1 33.291 233.028 A 22.987 22.987 0 0 1 34.771 225.165 Q 36.688 219.886 41.091 214.128 A 55.374 55.374 0 0 1 47.623 207.08 Q 54.86 200.425 66.229 193.644 A 175.557 175.557 0 0 1 66.591 193.428 A 130.652 130.652 0 0 1 80.345 186.235 A 171.214 171.214 0 0 1 92.991 181.128 Q 107.991 175.728 120.891 172.428 Q 125.391 163.728 129.591 155.328 Q 133.791 146.928 137.691 138.528 A 154.613 154.613 0 0 0 138.526 136.652 Q 140.105 133.049 143.091 125.928 A 547.175 547.175 0 0 0 146.142 118.489 Q 148.791 111.903 151.791 104.028 A 402.423 402.423 0 0 0 158.458 85.063 A 467.112 467.112 0 0 0 160.941 77.178 A 378.073 378.073 0 0 0 167.118 54.517 A 338.105 338.105 0 0 0 168.291 49.428 A 141.68 141.68 0 0 0 170.315 38.381 Q 171.047 33.158 171.23 28.483 A 78.129 78.129 0 0 0 171.291 25.428 A 48.9 48.9 0 0 0 170.954 19.493 Q 170.583 16.47 169.805 13.979 A 20.187 20.187 0 0 0 167.841 9.528 A 11.163 11.163 0 0 0 161.052 4.502 Q 159.052 3.934 156.61 3.845 A 25.3 25.3 0 0 0 155.691 3.828 Z" />
            </g>
            {/* Group for "J" */}
            <g id="J" transform="translate(900,56)">
              <path d="M 106.2 4.201 L 106.8 8.701 Q 112.8 7.801 119.1 7.501 Q 125.4 7.201 132 7.201 L 141 7.201 Q 145.5 7.201 150 7.801 Q 154.528 8.278 155.459 9.701 A 1.433 1.433 0 0 1 155.7 10.501 Q 155.7 11.687 151.009 11.701 A 37.805 37.805 0 0 1 150.9 11.701 A 80.409 80.409 0 0 1 145.781 11.532 A 92.083 92.083 0 0 1 144 11.401 A 86.058 86.058 0 0 0 138.769 11.12 A 75.118 75.118 0 0 0 137.1 11.101 Q 122.4 11.101 108 15.301 A 467.279 467.279 0 0 1 111.496 38.552 A 586.692 586.692 0 0 1 113.4 55.801 Q 115.5 77.701 115.5 100.501 Q 115.5 127.801 111.15 154.201 A 177.671 177.671 0 0 1 102.12 188.303 A 154.801 154.801 0 0 1 96 202.351 Q 85.2 224.101 65.7 237.601 Q 57.3 243.301 48.6 246.151 A 59.628 59.628 0 0 1 39.61 248.375 A 46.799 46.799 0 0 1 32.1 249.001 Q 18.6 249.001 9.3 241.801 A 22.787 22.787 0 0 1 0.119 225.258 A 29.01 29.01 0 0 1 0 222.601 A 29.58 29.58 0 0 1 0.763 216.109 Q 1.55 212.61 3.15 208.801 A 55.82 55.82 0 0 1 6.567 202.066 Q 9.188 197.626 12.9 192.901 Q 25.2 177.901 41.25 168.001 Q 57.3 158.101 74.1 149.701 A 15.923 15.923 0 0 1 74.944 149.307 Q 76.125 148.801 76.8 148.801 Q 77.667 148.801 77.699 149.357 A 0.758 0.758 0 0 1 77.7 149.401 Q 77.7 151.501 73.5 153.901 A 180.218 180.218 0 0 0 62.91 159.496 Q 56.203 163.349 51 167.251 Q 42 174.001 34.5 182.401 A 246.408 246.408 0 0 0 28.622 189.249 Q 23.513 195.413 17.7 203.101 Q 13.566 208.613 11.19 213.423 A 40.3 40.3 0 0 0 9.9 216.301 Q 7.957 221.158 7.587 225.229 A 20.678 20.678 0 0 0 7.5 227.101 A 18.326 18.326 0 0 0 8.236 232.439 A 13.787 13.787 0 0 0 13.2 239.551 A 20.711 20.711 0 0 0 21.734 243.339 A 29.171 29.171 0 0 0 27.6 243.901 Q 34.291 243.901 42.111 241.08 A 61.556 61.556 0 0 0 42.6 240.901 A 56.978 56.978 0 0 0 53.349 235.515 A 69.997 69.997 0 0 0 58.5 231.901 Q 77.1 217.801 87 198.151 Q 96.9 178.501 100.8 156.151 Q 104.7 133.801 104.7 111.601 A 360.66 360.66 0 0 0 103.512 81.879 A 321.401 321.401 0 0 0 102.9 75.301 Q 101.1 57.901 98.85 43.501 L 95.1 19.501 Q 77.1 27.001 61.8 37.801 Q 60.6 38.401 60 38.401 A 2.742 2.742 0 0 1 57.88 37.408 Q 57.528 37.014 57.233 36.462 A 6.589 6.589 0 0 1 57.15 36.301 A 10.113 10.113 0 0 1 56.301 33.938 A 8.576 8.576 0 0 1 56.1 32.101 A 7.585 7.585 0 0 1 56.419 29.839 A 5.735 5.735 0 0 1 58.8 26.701 A 142.408 142.408 0 0 1 71.732 19.545 A 124.172 124.172 0 0 1 76.05 17.551 Q 84.6 13.801 93.9 11.401 A 7.908 7.908 0 0 1 93.873 10.744 Q 93.873 7.446 96.6 3.901 Q 99.6 0.001 102.6 0.001 Q 105.9 0.001 106.2 4.201 Z" />
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
