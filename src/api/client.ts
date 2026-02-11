export const uploadTodo = async (todo: any) => {
  console.log("Uploading todo ->", todo);
  await new Promise((r) => setTimeout(r, 500));

  return { ok: true };
};
