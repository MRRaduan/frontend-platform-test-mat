type TCardCoverProps = {
  hasFavoriteOption?: false;
};

const CardCover = ({ hasFavoriteOption }: TCardCoverProps) => {
  return (
    <div className="Card flex min-[1152px]:max-w-[204px] lg:flex-col w-full rounded-md bg-neutral-800">
      <div>
        <img
          src="/assets/images/beatles-cover.jpeg"
          width="100%"
          height="100%"
          alt="beatles"
          className="max-w-24 lg:max-w-full"
        />
      </div>
      <div className="p-2 lg:p-4 w-full flex items-center">
        <div className="w-full">
          <h4 className="font-bold text-lg">Outside</h4>
          <div className="mt-1 lg:mt-3 flex justify-between w-full">
            <p className="block font-bold text-[#666666] lg:text-xs">
              Foo Fighters
            </p>
            {hasFavoriteOption ? (
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block"
                >
                  <path
                    d="M9.56859 3.87749L10.03 4.43561L10.5455 3.87749C12.3592 2.00054 15.1714 2.08784 17.0363 3.87749L17.1677 4.00844C18.9814 5.8854 18.537 9.63697 16.8076 11.5669L16.5802 11.8156L16.3269 12.083C15.3511 13.0971 13.8554 14.4856 11.8398 16.2484L10.6888 17.247C10.2916 17.5891 9.71365 17.5838 9.32246 17.2344L7.90167 15.9581L6.6367 14.8065C5.13309 13.4267 4.00446 12.3468 3.25081 11.5669C1.3939 9.64526 1.03653 5.93009 2.89345 4.00844C4.75036 2.0868 7.71167 1.95585 9.56859 3.87749Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCover;