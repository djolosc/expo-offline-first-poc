export const uploadTodo = async (todo: any) => {
  console.log("Uploading todo ->", todo);

  await new Promise((r) => setTimeout(r, 500));

  // 30% chance to fail
  const shouldFail = Math.random() < 0.3;

  if (shouldFail) {
    throw new Error("Random network failure");
  }

  return { ok: true };
};
