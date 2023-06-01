export function PublicCheckbox() {
  return (
    <label
      htmlFor="isPublic"
      className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
    >
      <input
        type="checkbox"
        id="isPublic"
        name="isPublic"
        value="true"
        className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
      />
      Tornar memória pública
    </label>
  )
}
