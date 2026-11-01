/** A step's number in a violet circle. */
export const StepNumber = ({ n }: { n: number }) => (
  <span className="mb-3.5 grid size-[34px] place-items-center rounded-full bg-primary font-bold text-on-primary">
    {n}
  </span>
);
