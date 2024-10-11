import Button from "../common/Button";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import PageWrapper from "../components/PageWrapper";

const ContactUs = () => {
  return (
    <PageWrapper title="Get in touch with us for any inquiries or support">
      <div className="gap-3 bg-background-200 p-3 w-full rounded-lg flex flex-col mt-3">
        <div className="w-full">
          <label className="ml-2 text-sm font-bold">Email</label>
          <Input
            className="w-full !bg-background-100"
            placeholder="Enter your email here"
          />
        </div>
        <div className="w-full">
          <label className="ml-2 text-sm font-bold">Message</label>
          <Textarea
            className="w-full min-h-[300px] !bg-background-100"
            placeholder="Enter your message here"
          />
        </div>
        <Button>Submit</Button>
      </div>
      <div className="bg-background-200 p-3 rounded-lg w-full flex lg:flex-row flex-col gap-5 mt-5">
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
          className="w-full h-60 rounded-lg"
        ></iframe>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
