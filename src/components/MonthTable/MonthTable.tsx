export type MonthItemProps = {
  list: { date: string; month: string; amount: number }[];
};

export default function MonthTable(props: MonthItemProps) {
  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
          {props.list.map((item, idx) => (
            <tr key={idx}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
