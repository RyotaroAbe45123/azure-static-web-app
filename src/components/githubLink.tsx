import { buildUrl } from "@/utils/buildUrl";

export const GitHubLink = () => {
  return (
    <div className="absolute z-0 m-0">
      <div className="p-2 rounded-16 flex">
        <img
          alt=""
          height={300}
          width={300}
          src={buildUrl("/ktriw.png")}
        ></img>
      </div>
    </div>
  );
};
