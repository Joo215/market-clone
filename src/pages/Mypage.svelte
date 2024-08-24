<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<div>나의 당근</div>
<div class="mypage_list">
  <button on:click={logout}>로그아웃</button>
  <!-- <button>수정하기</button> -->
</div>
<Nav location="my" />

<style>
  button {
    padding: 10px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin: 10px;
  }

  /* .mypage_list {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
  } */
</style>
