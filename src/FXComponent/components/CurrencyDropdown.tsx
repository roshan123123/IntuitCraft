type CurrencyDropdownPropType = {
  currencyOPtions: string[];
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  title: string;
};

const CurrencyDropdown = ({
  currencyOPtions,
  currency,
  setCurrency,
  title,
}: CurrencyDropdownPropType) => {
  return (
    <div className="p-2 flex gap-2 border bg-white rounded-md">
      <label htmlFor={title}>{title}</label>
      <select
        className=" border-none"
        name={title}
        id={title}
        value={currency ||""}
        onChange={(e) => {
          setCurrency(e.target.value || undefined);
        }}
      >
        <option key={'placeholder'} value={""}>
          SELECT COUNTRY
        </option>
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
