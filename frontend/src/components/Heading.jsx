

const Heading = ({ className, title, text, img }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-18 lg:text-center xl:text-center max-lg:text-center`}
    >
      
      {title && <h2 className="h2 font-bold">{title}</h2>}
      {img && <img src={img} className="absolute top-full max-md:top-6 left-[50%]  w-[285px] translate-x-[-50%] h-[40px] xl:-mt-2"/>}
      {text && <p className="body-2 mt-4 text-neutral-900">{text}</p>}
    </div>
  );
};

export default Heading;
