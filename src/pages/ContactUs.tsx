import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import GradientBackground from "../components/GradientBackground";

const ContactUs = () => {
  return (
    <div className="relative">
      <GradientBackground />
      <div className="relative flex flex-col items-center mt-10 container m-auto">
        <h3 className="text-xl">
          We'd love to hear from you! Reach out to us anytime.
        </h3>
        <div className="gap-5 bg-background-100 p-5 w-full mt-10 rounded flex flex-col">
          <div className="w-full">
            <label className="ml-2 text-sm font-bold">Email:</label>
            <Input className="w-full" placeholder="Enter your email here" />
          </div>
          <div className="w-full">
            <label className="ml-2 text-sm font-bold">Message:</label>
            <Textarea
              className="w-full min-h-[300px]"
              placeholder="Enter your message here"
            />
          </div>
          <Button>Submit</Button>
        </div>
        <div className="bg-background-100 p-5 rounded w-full flex lg:flex-row flex-col gap-5 mt-10">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-lg font-bold">Address</p>
              <p>643 West 30th St, Los Angeles, CA 90007</p>
            </div>

            <div>
              <p className="text-lg font-bold">Email</p>
              <p>contact@luckyvillage.org</p>
            </div>
            <div>
              <p className="text-lg font-bold">Phone</p>
              <p>+1 804 491 9593</p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2338.1531289602863!2d-118.28996606611493!3d34.027253965370406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sru!4v1722619039213!5m2!1sen!2sru"
            style={{ border: 0 } as React.CSSProperties}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-60 rounded"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
