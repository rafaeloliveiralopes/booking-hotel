export default function Footer() {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tighter">
          <p>Hotel Ponta do Sol</p>
        </span>
        <span className="text-white font-bold tracking-tighter flex gap-4">
          <p className="cursor-pointer">Políticas de Privacidade</p>
          <p className="cursor-pointer">Termos de Serviços</p>
        </span>
      </div>
    </div>
  );
}
