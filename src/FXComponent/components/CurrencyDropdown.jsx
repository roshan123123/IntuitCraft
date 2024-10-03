/* eslint-disable react/prop-types */
const CurrencyDropdown = ({
  currencyOPtions,
  currency,
  setCurrency,
  title,
}) => {
  return (
    <div className="p-2 flex gap-2 border bg-white rounded-md">
      <label htmlFor={title}>{title}</label>
      <select
        className=" border-none"
        name={title}
        id={title}
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
      >
      
        {currencyOPtions.map((currency) => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyDropdown;