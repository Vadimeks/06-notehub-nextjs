// app/page.tsx

// Гэты файл адказвае за маршрут /
// Тут мы пакідаем толькі разметку галоўнай старонкі з прывітаннем і апісаннем.

import css from "./page.module.css"; // Пакідаем імпарт стыляў, калі вы іх скапіявалі.
// Звярніце ўвагу: калі Header і Footer падключаны ў app/layout.tsx,
// тут яны не патрэбны.

// Увесь код, звязаны з TanStack Query, станамі, API-запытамі і кампанентамі нататак,
// быў выдалены. Ён належыць старонцы /notes.

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and Browse
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>
    </main>
  );
}
