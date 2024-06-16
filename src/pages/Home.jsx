import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import CreateExpense from "../components/CreateExpense";

// 테일윈드 예시
// function Container({ children }) {
//   return <section className="블라블라블라">
//     {children}
//   </section>
// }

export default function Home() {
  return (
    <main className="max-w-3xl w-full flex flex-col gap-5 mx-auto">
      <MonthNavigation />
      <CreateExpense />
      <ExpenseList />
    </main>
  );
}
