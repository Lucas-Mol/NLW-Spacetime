export function MemoryContentTextArea() {
  return (
    <textarea
      name="content"
      spellCheck="false"
      className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-lg scrollbar-corner-rounded-lg placeholder:text-gray-400 focus:ring-0"
      placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
    />
  )
}
