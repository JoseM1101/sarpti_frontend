"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { Tabs, TabsList, TabsTrigger } from "./ui/Tabs"
import Button from "./ui/Button"
import { Separator } from "./ui/Separator"
import { Info, Pause, StopCircle } from 'lucide-react'

const ProjectCard: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-4">
          <h2 className="text-xl font-medium">
            Nombre del proyecto de investigación adscrito al CIDETIU prueba especial
          </h2>
          <Tabs defaultValue="proyecto" className="w-full">
            <TabsList>
              <TabsTrigger
                value="proyecto"
                className="border border-lightblue text-lightblue bg-white hover:bg-blue-500 hover:text-white hover:border-black"
              >
                Proyecto
              </TabsTrigger>
              <TabsTrigger
                value="investigacion"
                className="border border-lightblue text-lightblue bg-white hover:bg-blue-500 hover:text-white hover:border-black"
              >
                Investigación
              </TabsTrigger>
              <TabsTrigger
                value="cidetiu"
                className="border border-lightblue text-lightblue bg-white hover:bg-blue-500 hover:text-white hover:border-black"
              >
                CIDETIU
              </TabsTrigger>
              <TabsTrigger
                value="plus"
                className="border border-lightblue text-lightblue bg-white hover:bg-blue-500 hover:text-white hover:border-black"
              >
                +
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-medium">
                  <Info size={18} className="text-blue-500" />
                  Descripción
                </h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry&apos;s standard dummy text ever since the 1500&apos;s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Autores:</h3>
                  <p className="text-sm text-muted-foreground">
                    Viñas, José; Medina, José; Molina; Cruz, Miguel
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Tutores:</h3>
                  <p className="text-sm text-muted-foreground">
                    Oropeza, José; Ordoñez, Maribel; Crespo, Maria
                  </p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden md:block">
              <Separator orientation="vertical" className="h-full border-l border-gray-300" />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Fecha inicio:</h3>
                <p className="text-sm text-muted-foreground">04-12-2024</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Fecha final:</h3>
                <p className="text-sm text-muted-foreground">--</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Productos:</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>ART-024IN-01</p>
                  <p>APP-024IN-02</p>
                  <p>VID-024IN-03</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Inversión:</h3>
                <p className="text-sm text-muted-foreground">0$</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button className="border border-red text-white bg-red hover:bg-red-300 hover:text-black">
              <StopCircle className="h-4 w-4" />
            </Button>
            <Button className="border border-yellow text-white bg-yellow hover:bg-yellow-300 hover:text-black">
              <Pause className="h-4 w-4" />
            </Button>
            <Button>
              Finalizar investigación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectCard