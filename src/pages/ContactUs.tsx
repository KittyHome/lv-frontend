import { useEffect } from "react";
import Button from "../common/Button";
import PageWrapper from "../components/PageWrapper";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Lucky Village | Contact";
  }, []);

  return (
    <PageWrapper title="Get in touch with us for any inquiries or support">
      <div className="gap-3 bg-background-200 p-3 w-full rounded-lg flex flex-col mt-3">
        Join our Community
        <Button
          onClick={() => window.open("https://discord.gg/3XSGag74Aq", "_blank")}
        >
          Join our Discord
        </Button>
      </div>
      <div className="bg-background-200 p-3 rounded-lg w-full flex lg:flex-row flex-col gap-5 mt-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-lg font-bold">Address</p>
            <p>643 West 30th St, Los Angeles, CA 90007</p>
          </div>
          <div>
            <p className="text-lg font-bold">Email</p>
            <p>info@kittyhome.org</p>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2338.1531289602863!2d-118.28996606611493!3d34.027253965370406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sru!4v1722619039213!5m2!1sen!2sru"
          style={{ border: 0 } as React.CSSProperties}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-60 rounded-lg"
        ></iframe>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
