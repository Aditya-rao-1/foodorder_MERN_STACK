import PlusSvg from "./PlusSvg";

const SectionSvg = ({ crossesOffset }) => {
  return (
    <>
      <PlusSvg
        className={`absolute -top-[0.3125rem] left-[1.562rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:left-0`}
      />

      <PlusSvg
        className={`absolute -top-[0.3125rem] right-[5px] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:right-0`}
      />
    </>
  );
};

export default SectionSvg;
