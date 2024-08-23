<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<div>나의 당근</div>
<button on:click={logout}>로그아웃</button>

<Nav location="my" />

<style>
  button {
    padding: 10px;
    border: 1px solid gainsboro;
    border-radius: 5px;
    margin: 10px;
  }
</style>
