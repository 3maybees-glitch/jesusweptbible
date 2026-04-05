"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface Character {
  name: string
  twoWordTheme?: string
  theme?: string
  referenceRange?: string
  ref?: string
  strongNumber?: string
  lemma?: string
  meaning?: string
  highlightedWords?: Array<{
    word: string
    strongNumber?: string
    lemma?: string
    meaning?: string
  }>
}

const CHARACTER_IMAGES: Record<string, string> = {
  Adam: "/images/adam.jpg",
  Moses: "/images/moses.jpg",
  Aaron: "/images/aaron.jpg",
  Abednego: "/images/abednego.jpg",
  Abel: "/images/abel.jpg",
  Abimelech: "/images/abimelech.jpg",
  Abigail: "/images/abigail.jpg",
  Abraham: "/images/abraham.jpg",
  Amos: "/images/amos.jpg",
  "Alexander the Coppersmith": "/images/alexander-coppersmith.jpg",
  Ahab: "/images/ahab.jpg",
  Absalom: "/images/absalom.jpg",
  Aquila: "/images/aquila.jpg",
  Apollos: "/images/apollos.jpg",
  Andrew: "/images/andrew.jpg",
  "Ananias of Damascus": "/images/ananias-damascus.jpg",
  "Ananias (High Priest)": "/images/ananias-high-priest.jpg",
  Barnabas: "/images/barnabas.jpg",
  Barak: "/images/barak.jpg",
  Balak: "/images/balak.jpg",
  Balaam: "/images/balaam.jpg",
  Asenath: "/images/asenath.jpg",
  Caiaphas: "/images/caiaphas.jpg",
  "Caesar Augustus": "/images/caesar-augustus.jpg",
  Bezalel: "/images/bezalel.jpg",
  Bathsheba: "/images/bathsheba.jpg",
  Bartholomew: "/images/bartholomew.jpg",
  Daniel: "/images/daniel.jpg",
  Cornelius: "/images/cornelius.jpg",
  Claudius: "/images/claudius.jpg",
  Cain: "/images/cain.jpg",
  Crispus: "/images/crispus.jpg",
  Meshach: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4e1d3025-4acd-48e0-aa69-8883da5e0f0e.jpeg",
  Matthew: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d6c9308-8d5f-4858-95d1-2e860a310a10.jpeg",
  Mary: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fc4d161f-4d55-4009-a3b6-b0cf3b4f61ce.jpeg",
  "Mary Magdalene": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/92b6bf2f-8a57-41e2-a254-76e0efe7044c.jpeg",
  David: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/53b305d2-2a34-41a0-a3c2-02b53228c138.jpeg",
  Mordecai: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eeec7bf9-5842-4a36-a8ba-683472e32e72.jpeg",
  Miriam: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ca46cd42-2a17-4f54-8d83-af8877784389.jpeg",
  Michal: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360cf33d-bfaf-4f3f-a9c6-33488deea857.jpeg",
  Micah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11c767ab-3cd0-4ea8-af27-937c24355f1f.jpeg",
  Noah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/364fe528-1b88-4a2f-8a84-760ac7d6b87d.jpeg",
  Nicodemus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e32fd38-9943-4eda-902e-d48a181944a0.jpeg",
  Nehemiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/47f72853-1e6b-44eb-9399-70583a581ecf.jpeg",
  Nathan: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/43bb3d52-a937-4e8d-8b30-9dd205ed6b66.jpeg",
  Nahum: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b3df3208-fae5-4f68-bef6-23e95a4fad63.jpeg",
  Deborah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/55441367-fb1a-453a-bb7b-2bb2d4f62aba.jpeg",
  Demas: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/afd1f450-9f8d-4d68-8d12-021ca10475b0.jpeg",
  Potiphar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/86f45d79-90a5-4b87-b52c-9019d34e0193.jpeg",
  Phinehas: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dddc9144-61b4-4c4a-86fa-916f5f55f69a.jpeg",
  Philip: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/724a8222-bd54-4038-b52f-572d1fbef4cd.jpeg",
  Philemon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/89a585cc-a096-43a9-b962-546b9d17fd88.jpeg",
  Paul: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3e63471b-7df4-459e-af43-de5eb4716cab.jpeg",
  Onesimus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ddc06c5e-7126-4964-8a6c-75ec46345f19.jpeg",
  Obadiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/88dbf506-746a-4e3f-93cb-6662e8578432.jpeg",
  Eve: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/54994dbf-e80f-46da-bf51-4de28adc75c2.jpeg",
  Esther: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/106f9d44-d8fc-4b07-b171-68f987ff2445.jpeg",
  Esau: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e846596c-350a-487e-8dfd-ad7e6b09c228.jpeg",
  Ephraim: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3abbf5ba-0c57-4a83-8cb4-022e28803b77.jpeg",
  Epaphroditus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1e97626-79cc-4572-8448-01040711f431.jpeg",
  Epaphras: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f67bf8d8-476d-4e33-bfb5-16b86cd0a271.jpeg",
  Enoch: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/32f16edf-66d7-40b8-9a6e-e5526c85b581.jpeg",
  Elisha: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef2966dd-7a9c-4a4c-921f-7cfbf54024fe.jpeg",
  Elijah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/969fab93-3bf3-42d8-8806-141172d218be.jpeg",
  Drusilla: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ca676722-db77-4806-b732-9dfc6fd4574c.jpeg",
  Haman: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e7f3c34-5572-4305-bfb6-17d5f8f3ca61.jpeg",
  Haggai: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8718ace9-e827-4810-86a9-2c883b17801a.jpeg",
  Hagar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13497ca6-bbd8-4182-b07c-5cdf57fcf543.jpeg",
  Habakkuk: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42488366-5b53-4be3-8899-0a460d888d4c.jpeg",
  Gideon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3d1dbfa4-7983-49c6-930b-6d1345164c8c.jpeg",
  Gamaliel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6c09b65c-0907-496d-9525-a029a654779a.jpeg",
  Festus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d2f93c6f-e0d6-486d-96cd-f6965ff11dbf.jpeg",
  Felix: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fc683eef-caf2-4c8a-8b3c-08d230c12f26.jpeg",
  Ezra: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8042de65-6c33-48b4-a4dd-7e644ea2f534.jpeg",
  Ezekiel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/508bf564-296f-4416-bf07-3e51e4cb2d2f.jpeg",
  Ishmael: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/79a28060-d00f-4452-9871-6bace6ff651b.jpeg",
  Isaiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c2d16fc8-ceb8-4d00-b988-d4e4c1c413aa.jpeg",
  Isaac: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cf507926-51cc-4ad4-abea-92b19be9efbd.jpeg",
  Hosea: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bb662a1c-fc5c-4155-af8c-a0923c8ddc4e.jpeg",
  Hezekiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/56c46c78-a511-4b97-9b66-07b27f1dcfab.jpeg",
  Herodias: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3160c2be-5765-4760-b392-185b45b1e490.jpeg",
  "Herod the Great": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/882e48fc-d0b0-4c92-b55d-48611996e942.jpeg",
  "Herod Antipas": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/40c889a6-5410-49c1-a97d-092a20dc0d30.jpeg",
  "Herod Agrippa II": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a37a5431-33e4-46e1-bcec-cdf3adf68f25.jpeg",
  "Herod Agrippa I": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0bc4771e-8344-4a83-a4d1-5b066a2a664a.jpeg",
  Jesus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c612c598-1d1e-4d86-8250-da1a92588412.jpeg",
  Jeremiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/51d23d75-78fe-49ee-9cba-9911a56958b6.jpeg",
  Jephthah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ce9cc61f-1d86-4edb-a23a-21b31c687a25.jpeg",
  "James son of Zebedee": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3f296843-56f3-4784-98d9-3c6d0aff4534.jpeg",
  "James son of Alphaeus": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/147da789-85ab-4830-bd48-6d44c3c4bf5c.jpeg",
  James: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03bec10e-ab6f-45b6-aa1b-c8414d2f9320.jpeg",
  Jael: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b05671f-ccdb-4d0b-811a-87cd4ff72e0c.jpeg",
  Jacob: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34f4b496-eea5-47a2-8f08-72e62f4bbfac.jpeg",
  "Joseph of Nazareth": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a28e60f6-cdac-4604-b464-ba5ea295b053.jpeg",
  "Joseph of Arimathea": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/66b7324e-97ff-44dc-b94a-a11dbe8a204a.jpeg",
  Jonathan: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5e894007-1761-46d9-bc1c-f52497096beb.jpeg",
  Jonah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c0da5c50-f1c3-452b-87cf-f9cfada11f36.jpeg",
  "John the Baptist": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9b214f69-ea0a-4b31-b72b-44ab7173039a.jpeg",
  "John (Revelation)": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e31ad999-f8f0-4ee4-a9c8-e0ccfe1a822c.jpeg",
  John: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/704e571a-4500-462e-a96e-654eb3b3b94e.jpeg",
  Joel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b16233ac-4a74-4e4c-89a4-10cec3a13018.jpeg",
  Joab: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/40c66c06-4d08-451d-825d-e77591bdbc67.jpeg",
  Jezebel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6703d58a-5b35-4858-9eb9-0675e046a9a4.jpeg",
  Jethro: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14f84c69-2c19-4ec4-925d-fccd655d64fd.jpeg",
  Luke: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/09fa4546-78b3-45a8-a28f-21189d6cef14.jpeg",
  Lot: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/535370e6-b022-4c02-b149-4e2678e48469.jpeg",
  Leah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/74816c5f-869d-47ca-9409-a9b87f5023d6.jpeg",
  Lazarus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9904cce2-765d-4059-bafb-e3c33e5da5b2.jpeg",
  Korah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a5bc9961-af15-4f8e-9966-063c11fc382d.jpeg",
  Jude: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ea1c6888-6f5b-4bbc-8878-c4fa33a53eb4.jpeg",
  "Judas Iscariot": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/54030e39-0096-45b5-9290-cfe481b27d44.jpeg",
  Judah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1ca8f1b3-3dfb-4c0f-ae27-46e0c525397e.jpeg",
  Josiah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/42a407ae-dd66-4600-9b5f-8b121dcc1186.jpeg",
  Joshua: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d7c7b1ff-f405-4db7-8bde-fca4ce7208d9.jpeg",
  Micah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e12be860-9508-4998-b41b-b70cce22dcbc.jpeg",
  Meshach: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c9193f5a-0c6d-4d75-bf57-a91e2ef7d240.jpeg",
  Matthew: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04fdd191-96c5-42a8-bde1-84efd9466a30.jpeg",
  Mary: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/68b1abfe-d533-4dfb-972d-b6bef367d732.jpeg",
  "Mary Magdalene": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/395c2238-2190-44d5-bf2c-d135082afc8c.jpeg",
  Mark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6ce54238-8415-47ec-8012-f509e02dcaec.jpeg",
  Manasseh: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a3f48ed2-b50f-48bb-8a42-fd11753c706e.jpeg",
  Malachi: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/282bf37f-16ff-4ed7-9918-41b039b408f8.jpeg",
  Lydia: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4a230309-3a43-420f-a047-f62e3fb2a8c5.jpeg",
  Tychicus: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dc46924-612a-4dd7-aef2-bf467f157d86.jpeg",
  Sosthenes: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f6bddfc0-dc7a-4c8d-993b-7718de93543e.jpeg",
  Timothy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8d496cf2-302d-452e-9be4-a7ddd560fd3b.jpeg",
  Stephen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/31e040a3-6b17-4554-8b14-07b098e42314.jpeg",
  Silas: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/035e2ade-270e-4919-8d85-6bbb27683e34.jpeg",
  Rebekah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/78184124-225b-45c4-9cff-d420afe13f5f.jpeg",
  Rachel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e940405f-1f5e-4bd1-a882-1a8ed06f246f.jpeg",
  Oholiab: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/61efbdc0-1e64-478b-bd64-d9759a398318.jpeg",
  Peter: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d4f1b8ac-eaa6-4b18-a1ee-5156d0c2f5c5.jpeg",
  Zechariah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a30eb005-e333-4baa-94db-c4295581c239.jpeg",
  Zephaniah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b5bfeabf-1735-47fe-ac78-9d08bf1c5812.jpeg",
  Solomon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/363d17df-c593-4667-bb38-1d788a3743f8.jpeg",
  Saul: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a7a018f2-0f59-454a-90f7-da38446edbd3.jpeg",
  Samuel: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21f96297-490c-4a37-a66f-4ed2b3cac093.jpeg",
  Ruth: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/29cc5693-ed30-42da-bfec-b63232c9d67e.jpeg",
  Samson: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6fee5e84-6cf4-4edf-81bc-7bb2721131d7.jpeg",
  Sarah: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ff172b10-d67b-4ef4-b832-88f8628dfff7.jpeg",
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Character | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch("/data/bible-characters.json")
        if (response.ok) {
          const data = await response.json()
          setCharacters(data.bibleCharacters || [])
          console.log("[v0] Loaded", data.bibleCharacters?.length, "characters from JSON")
        } else {
          setCharacters([])
        }
      } catch (err) {
        console.log("[v0] Error loading characters:", err)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const displayCharacters = showAll ? filtered : filtered.slice(0, 10)

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-12">
        <p className="text-muted-foreground">Loading Bible characters...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bible Characters Explorer</h1>

      <input
        type="text"
        placeholder="Search Bible characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCharacters.map((person) => (
          <Card
            key={person.name}
            className="cursor-pointer hover:shadow-lg transition-all hover:border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20"
            onClick={() => setSelected(person)}
          >
            <CardContent className="p-4 space-y-2 text-center">
              {CHARACTER_IMAGES[person.name] && (
                <div className="w-full aspect-square overflow-hidden rounded-md mb-3">
                  <img
                    src={CHARACTER_IMAGES[person.name]}
                    alt={`Portrait of ${person.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg text-accent">{person.name}</h3>
              <p className="text-base text-foreground font-medium">
                {person.twoWordTheme || person.theme}
              </p>
              <p className="text-sm text-muted-foreground">
                {person.referenceRange || person.ref}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && filtered.length > 10 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            View Complete List ({filtered.length} characters)
          </button>
        </div>
      )}

      {showAll && filtered.length > 10 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-2 rounded-lg border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors"
          >
            Show Less
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-background to-background/95 border-2 border-accent/30 rounded-lg max-w-md w-full max-h-screen overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-accent/20 bg-gradient-to-r from-accent/10 to-accent/5">
              <h2 className="text-2xl font-bold text-accent">{selected.name}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-accent transition-colors hover:bg-accent/10 p-2 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Portrait */}
            {CHARACTER_IMAGES[selected.name] && (
              <div className="w-full flex justify-center bg-accent/5 py-4 px-6">
                <img
                  src={CHARACTER_IMAGES[selected.name]}
                  alt={`Portrait of ${selected.name}`}
                  className="h-52 w-auto object-contain rounded-md"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-5">
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <span className="font-bold text-sm text-accent">Theme: </span>
                <span className="text-base text-foreground font-semibold">{selected.twoWordTheme || selected.theme}</span>
              </div>

              {selected.strongNumber && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Strong's Number: </span>
                  <span className="text-base text-foreground font-mono font-semibold">{selected.strongNumber}</span>
                </div>
              )}

              {selected.lemma && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Lemma: </span>
                  <span className="text-base text-foreground font-mono font-semibold">{selected.lemma}</span>
                </div>
              )}

              {selected.meaning && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Meaning: </span>
                  <span className="text-sm text-foreground leading-relaxed">{selected.meaning}</span>
                </div>
              )}

              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <span className="font-bold text-sm text-accent">Story Arc: </span>
                <span className="text-sm text-foreground">{selected.referenceRange || selected.ref}</span>
              </div>

              {/* Key Terms if available */}
              {selected.highlightedWords && selected.highlightedWords.length > 0 && (
                <div className="pt-4 border-t-2 border-accent/20">
                  <p className="font-bold text-base text-accent mb-4">Key Terms</p>
                  <div className="space-y-3">
                    {selected.highlightedWords.map((word, idx) => (
                      <div key={idx} className="bg-accent/5 rounded-lg p-3 border border-accent/20">
                        <div className="font-bold text-sm text-accent mb-2">{word.word}</div>
                        {word.strongNumber && (
                          <div className="text-xs text-foreground mb-1">
                            Strong's: <span className="font-mono font-semibold text-accent">{word.strongNumber}</span>
                          </div>
                        )}
                        {word.meaning && (
                          <div className="text-xs text-foreground italic">{word.meaning}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
