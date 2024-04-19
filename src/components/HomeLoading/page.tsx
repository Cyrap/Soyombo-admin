import Image from "next/image";
import logo from "../../app/nav.png";
import { Progress } from "@nextui-org/react";
const HomeLoading = () => {
  return (
    <span>
    <Progress
    size="sm"
    isIndeterminate
    aria-label="Loading..."
  />
    <div className="flex justify-center items-center h-[60vh]">
        <Image
      width={300}
      alt="Soyombo.mn"
      src={logo}
    />
    </div>
    </span>
  );
}

export default HomeLoading;
