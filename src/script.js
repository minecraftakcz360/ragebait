async function getTemplateId(activityId) {
  const url = `https://wordwall.net/resource/${activityId}`;
  const response = await fetch(url);
  const html = await response.text();
  const lines = html.split("\n");
  const targetLine = lines[81];
  const match = targetLine.match(/s\.templateId=Number\((\d+)\)/);
  return match ? match[1] : "";
}

(async () => {
  const score = prompt("Score:");
  const time = prompt("Time:");
  const name = prompt("Name:");
  const activityId = prompt("Activity Id:");

  const templateId = await getTemplateId(activityId);

  await fetch("https://wordwall.net/leaderboardajax/addentry", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      score,
      time,
      name,
      mode: "1",
      activityId,
      templateId
    })
  });
})();