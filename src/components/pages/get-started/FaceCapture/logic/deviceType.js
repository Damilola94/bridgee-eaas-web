export const isMobile = (userAgent) => {
  // eslint-disable-next-line no-console
  console.log();
  return !!userAgent.match(
    /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i
  );
};
