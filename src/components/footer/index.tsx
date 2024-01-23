import { Separator } from "../ui/separator";
import { Github, Linkedin } from "lucide-react";

interface SocialMedia {
  link: string;
  icon: JSX.Element;
}

export function Footer() {
  const socialMedias: SocialMedia[] = [
    {
      link: "http://github.com/ramonramoscardoso",
      icon: <Github strokeWidth={1} />,
    },
    {
      link: "http://linkedin.com/in/ramonramoscardoso",
      icon: <Linkedin strokeWidth={1} />,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-5 min-h-[150px] w-full mt-32 text-center font-thin text-sm">
      <Separator />
      <span>Feito com 💙 por Ramon Ramos</span>
      <div className="flex justify-center gap-3">
        {socialMedias.map((socialMedia, index) => {
          return (
            <a
              key={`social-media-${index}`}
              href={socialMedia.link}
              target="_blank"
              className="bg-card rounded-full p-2 border border-current"
            >
              {socialMedia.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
