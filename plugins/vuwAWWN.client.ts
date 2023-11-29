import AWN from "awesome-notifications";

export default defineNuxtPlugin((nuxtApp) => {
  const vuwAWNOptions = {
    position: "top-right",
  };

  return {
    provide: {
      awn: new AWN(vuwAWNOptions),
    },
  };
});
