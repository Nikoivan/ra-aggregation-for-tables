import { BaseListProps } from "../Tables/Tables";

export default function SortTable(props: BaseListProps) {
  console.log(props);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          {props.list.map((item, idx) => (
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
