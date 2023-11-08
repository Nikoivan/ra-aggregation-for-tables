export type YearListProps = {
  list: { date: string; year: string; amount: number }[];
};

export default function YearTable(props: YearListProps) {
  console.log(props);
  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Year</th>
            <th>Amount</th>
          </tr>
          {props.list.map((item, id) => (
            <tr key={id}>
              <td>{item.year}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
