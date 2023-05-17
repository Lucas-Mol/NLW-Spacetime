interface TitleProps {
  title: String
}

export function Title(props: TitleProps) {
  return <h1 className="text-4xl font-bold">{props.title}</h1>
}
