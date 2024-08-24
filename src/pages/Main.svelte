<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import Nav from "../components/Nav.svelte";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second > 0) return `${second}초 전`;
    else return "방금전";
  };

  const db = getDatabase();
  const itemstRef = ref(db, "items/");
  onMount(() => {
    onValue(itemstRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location__icons">
        <img src="assets/arrow.svg" alt="arrow" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="search" />
      <img src="assets/menu.svg" alt="menu" />
      <img src="assets/bell.svg" alt="bell" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imgurl} alt="imgae" />
      </div>
      <div class="item-list__info">
        <div class="item-lost__info-title">{item.title}</div>
        <div class="item-lost__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-lost__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
      <a class="reedit-btn" href="#/re">수정하기</a>
    </div>
  {/each}

  <a class="wirte-btn" href="#/write">+ 글쓰기</a>
</main>

<Nav location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요</div>

<style>
  .info-bar__time {
    color: blue;
  }
  .reedit-btn {
    padding: 10px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin: 10px;
  }
</style>
