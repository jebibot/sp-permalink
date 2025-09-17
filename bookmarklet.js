(async () => {
  const id = document.querySelector('[class^="CommentWriteForm_commentInput__"] img')?.alt;
  if (!id) throw new Error("아이디를 찾지 못했습니다");
  const c = document.querySelector(`[class^="CommentItem_commentInputElement__"]:has(img[alt="${id}"])`);
  if (!c) throw new Error("댓글을 찾지 못했습니다");
  const cid = Object.entries(c).find(([k]) => k.startsWith("__reactFiber$"))?.[1].return?.memoizedProps?.comment.id;
  if (!cid) throw new Error("댓글 ID를 찾지 못했습니다");
  location.hash = `#comment_noti${cid}`;
  await navigator.clipboard.writeText(location.href);
  prompt("복사되었습니다! 복사가 되지 않으면 아래 텍스트를 복사하여 주세요.", location.href);
  location.reload();
})().catch((e) => {
  alert(`오류가 발생했습니다: ${e}`);
});
