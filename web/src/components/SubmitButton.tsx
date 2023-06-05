interface Props {
  text: string
}

export function SubmitButton(props: Props) {
  return (
    <button
      type="submit"
      className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
    >
      {props.text}
    </button>
  )
}
