const models = [
   {
      model: 'Roll mid',
      type: 'city',
      range: 'mid',
      brand: 'Specialized',
      description:
         'Tiene todo lo que necesitas para ayudarte a llegar a cualquier lado y además mantenerte en forma. Para ello cuenta con una geometría muy cómoda que te hará mantener la sonrisa aunque las cosas se pongan difíciles. Neumáticos de 650b con mucha tracción. Un cuadro con un diseño que te permitirá subirte y bajarte de la bicicleta en un suspiro. Y todo esto en una bicicleta con una bonita estética y que te producirá una sensación de alegría cada vez que la montes.',
      image: 'https://assets.specialized.com/i/specialized/96120-72_ROLL-mid-ENTRY-BLK-CHAR-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Roll Sport',
      type: 'city',
      range: 'mid',
      brand: 'Scott',
      description:
         'Tiene todo lo que necesitas para ayudarte a llegar a cualquier lado y además mantenerte en forma. Para ello cuenta con una geometría muy cómoda que te hará mantener la sonrisa aunque las cosas se pongan difíciles. Neumáticos de 650b con mucha tracción. Un cuadro con un diseño que te permitirá subirte y bajarte de la bicicleta en un suspiro. No tienes que sacrificarte, solo necesitas la Roll Spor',
      image: 'https://assets.specialized.com/i/specialized/96121-66_ROLL-SPORT-mid-ENTRY-BLSH-SMK-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Sirrus X 2.0 Step',
      type: 'city',
      range: 'mid',
      brand: 'Kross',
      description:
         'La Sirrus X es tu pasaje para montar más y hacerlo por esos lugares por donde nunca imaginaste. Es una bicicleta cómoda, eficaz, de "vamos a por todo" que te inspirará a montar más de lo que nunca lo has hecho. Con neumáticos más anchos que te darán mayor confianza, una posición de conducción un poco más vertical, cambios súper intuitivos y además con la capacidad de montar portabultos y guardabarros, será tu compañera de aventuras perfecta en todo tipo de carreteras.',
      image: 'https://assets.specialized.com/i/specialized/92420-84_SIRRUS-X-20-ST-DSTTUR-RKTRED-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Roll high',
      type: 'city',
      range: 'high',
      brand: 'Specialized',
      description:
         'Tiene todo lo que necesitas para ayudarte a llegar a cualquier lado y además mantenerte en forma. Para ello cuenta con una geometría muy cómoda que te hará mantener la sonrisa aunque las cosas se pongan difíciles. Neumáticos de 650b con mucha tracción. Un cuadro con un diseño que te permitirá subirte y bajarte de la bicicleta en un suspiro. Y todo esto en una bicicleta con una bonita estética y que te producirá una sensación de alegría cada vez que la montes.',
      image: 'https://assets.specialized.com/i/specialized/96120-72_ROLL-mid-ENTRY-BLK-CHAR-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Roll Sport XT',
      type: 'city',
      range: 'high',
      brand: 'Scott',
      description:
         'Tiene todo lo que necesitas para ayudarte a llegar a cualquier lado y además mantenerte en forma. Para ello cuenta con una geometría muy cómoda que te hará mantener la sonrisa aunque las cosas se pongan difíciles. Neumáticos de 650b con mucha tracción. Un cuadro con un diseño que te permitirá subirte y bajarte de la bicicleta en un suspiro. No tienes que sacrificarte, solo necesitas la Roll Spor',
      image: 'https://assets.specialized.com/i/specialized/96121-66_ROLL-SPORT-mid-ENTRY-BLSH-SMK-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Sirrus X 2.0 V2',
      type: 'city',
      range: 'high',
      brand: 'Kross',
      description:
         'La Sirrus X es tu pasaje para montar más y hacerlo por esos lugares por donde nunca imaginaste. Es una bicicleta cómoda, eficaz, de "vamos a por todo" que te inspirará a montar más de lo que nunca lo has hecho. Con neumáticos más anchos que te darán mayor confianza, una posición de conducción un poco más vertical, cambios súper intuitivos y además con la capacidad de montar portabultos y guardabarros, será tu compañera de aventuras perfecta en todo tipo de carreteras.',
      image: 'https://assets.specialized.com/i/specialized/92420-84_SIRRUS-X-20-ST-DSTTUR-RKTRED-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'S-Works Enduro',
      type: 'mountain',
      range: 'top',
      brand: 'Scott',
      description:
         'Si buscas montar la bicicleta de enduro más rápida y eficiente, no puedes hacerlo mejor que con el modelo que define el género. La S-Works Enduro se enfrenta felizmente a todos los terrenos.',
      image: 'https://assets.specialized.com/i/specialized/93622-00_ENDURO-SW-BLKLQDMET-BLKLQDMET-SILDST_HERO?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto',
   },
   {
      model: 'Turbo Levo Comp',
      type: 'mountain',
      range: 'top',
      brand: 'Kross',
      description:
         'La nueva Levo ofrece una increíble potencia para recorrer más senderos gracias a una combinación inigualable entre calidad de conducción, potencia utilizable y autonomía. Es el refinamiento, la implementación y la amplificación de todo lo que sabemos sobre el mountain bike: una obsesión de 40 años en crear las mejores bicis de mountain del mundo. Desde su presentación, la Turbo Levo ha marcado el camino a seguir, es la meta por alcanzar de cualquier e-mountain bike, y esta nueva bicicleta vuelve a subir el listón.',
      image: 'https://assets.specialized.com/i/specialized/96422-50_LEVO-COMP-CARBON-BLK-LTSIL-BLK_HERO?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto',
   },
   {
      model: 'Kenevo Comp',
      type: 'mountain',
      range: 'top',
      brand: 'Scott',
      description:
         'La Kenevo es la eMTB con mayor rendimiento que puedes encontrar, con 180 mm de suspensión delantera y trasera, el motor más suave y potente disponible, y ahora con más kilómetros por carga que nunca. Nuestro modelo Kenevo Comp combina toda esa tecnología con un conjunto de componentes inteligentemente escogidos que soportarán las condiciones y a los usuarios más exigentes.',
      image: 'https://assets.specialized.com/i/specialized/98022-50_KENEVO-COMP-6FATTIE-LGNBLU-BLK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Rockhopper Expert 29',
      type: 'mountain',
      range: 'high',
      brand: 'Scott',
      description:
         'Realmente nos hemos superado a nosotros mismos con esta bicicleta. Demostrando que la verdadera capacidad de domesticar senderos no tiene que tener un precio intimidante, la Rockhopper Expert es la culminación de 30 años de redefinir la relación entre calidad-precio y rendimiento. Comenzamos con un cuadro de aluminio Premium A1 minuciosamente diseñado, añadimos una geometría moderna que tenga en cuenta la eficiencia y la capacidad de confianza, y ya tendrás una base sólida de nuestra mejor Rockhopper hasta el momento. Combina eso con una lista de componentes que simplemente harán volar a esta Rockhopper: horquilla RockShox Judy SoloAir, frenos hidráulicos Shimano MT-200, ruedas preparadas para Tubeless, transmisión SRAM Eagle 1x12.',
      image: 'https://assets.specialized.com/i/specialized/91522-31_ROCKHOPPER-EXPERT-29-LGNBLU-LTSIL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Rockhopper Sport 29',
      type: 'mountain',
      range: 'high',
      brand: 'Kross',
      description:
         'Realmente nos hemos superado a nosotros mismos con esta bicicleta. Demostrando que la verdadera capacidad de domesticar senderos no tiene que tener un precio intimidante, la Rockhopper Expert es la culminación de 30 años de redefinir la relación entre calidad-precio y rendimiento. Comenzamos con un cuadro de aluminio Premium A1 minuciosamente diseñado, añadimos una geometría moderna que tenga en cuenta la eficiencia y la capacidad de confianza, y ya tendrás una base sólida de nuestra mejor Rockhopper hasta el momento. Combina eso con una lista de componentes que simplemente harán volar a esta Rockhopper: horquilla RockShox Judy SoloAir, frenos hidráulicos Shimano MT-200, ruedas preparadas para Tubeless, transmisión SRAM Eagle 1x12.',
      image: 'https://assets.specialized.com/i/specialized/91822-64_ROCKHOPPER-SPORT-29-BLZ-ICEPPYA_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Chisel SD',
      type: 'mountain',
      range: 'high',
      brand: 'Specialized',
      description:
         'La nueva Chisel ha sido especialmente diseñada para afrontar los trazados modernos de cross country y circuitos de competición con la mayor velocidad. De hecho, comparte muchas de las mismas características modernas que su hermana la Epic Hardtail, pero en un conjunto más económico , Lo que la convierte en la bicicleta rígida de aluminio más eficiente y capaz que existe.',
      image: 'https://assets.specialized.com/i/specialized/91722-70_CHISEL-HT-MRN-ICEPPYA_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Rockhopper Expert MT',
      type: 'mountain',
      range: 'mid',
      brand: 'Scott',
      description:
         'Realmente nos hemos superado a nosotros mismos con esta bicicleta. Demostrando que la verdadera capacidad de domesticar senderos no tiene que tener un precio intimidante, la Rockhopper Expert es la culminación de 30 años de redefinir la relación entre calidad-precio y rendimiento. Comenzamos con un cuadro de aluminio Premium A1 minuciosamente diseñado, añadimos una geometría moderna que tenga en cuenta la eficiencia y la capacidad de confianza, y ya tendrás una base sólida de nuestra mejor Rockhopper hasta el momento. Combina eso con una lista de componentes que simplemente harán volar a esta Rockhopper: horquilla RockShox Judy SoloAir, frenos hidráulicos Shimano MT-200, ruedas preparadas para Tubeless, transmisión SRAM Eagle 1x12.',
      image: 'https://assets.specialized.com/i/specialized/91522-31_ROCKHOPPER-EXPERT-29-LGNBLU-LTSIL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Rockhopper Sport 29-XF',
      type: 'mountain',
      range: 'mid',
      brand: 'Kross',
      description:
         'Realmente nos hemos superado a nosotros mismos con esta bicicleta. Demostrando que la verdadera capacidad de domesticar senderos no tiene que tener un precio intimidante, la Rockhopper Expert es la culminación de 30 años de redefinir la relación entre calidad-precio y rendimiento. Comenzamos con un cuadro de aluminio Premium A1 minuciosamente diseñado, añadimos una geometría moderna que tenga en cuenta la eficiencia y la capacidad de confianza, y ya tendrás una base sólida de nuestra mejor Rockhopper hasta el momento. Combina eso con una lista de componentes que simplemente harán volar a esta Rockhopper: horquilla RockShox Judy SoloAir, frenos hidráulicos Shimano MT-200, ruedas preparadas para Tubeless, transmisión SRAM Eagle 1x12.',
      image: 'https://assets.specialized.com/i/specialized/91822-64_ROCKHOPPER-SPORT-29-BLZ-ICEPPYA_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Chisel RS',
      type: 'mountain',
      range: 'mid',
      brand: 'Specialized',
      description:
         'La nueva Chisel ha sido especialmente diseñada para afrontar los trazados modernos de cross country y circuitos de competición con la mayor velocidad. De hecho, comparte muchas de las mismas características modernas que su hermana la Epic Hardtail, pero en un conjunto más económico , Lo que la convierte en la bicicleta rígida de aluminio más eficiente y capaz que existe.',
      image: 'https://assets.specialized.com/i/specialized/91722-70_CHISEL-HT-MRN-ICEPPYA_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Rockhopper Sport 29-AH',
      type: 'road',
      range: 'top',
      brand: 'Specialized',
      description:
         'Lista para el juego con los frenos de disco hidráulicos Shimano MT200, transmisión MicroSHIFT y una horquilla SR Suntour XCM hecha para el ajetreo; la Rockhopper Sport puede lograr la victoria cualquier domingo, ¡y el resto de la semana también!.',
      image: 'https://assets.specialized.com/i/specialized/97222-02_AETHOS-SW-ETAP-CARB-CMLNEYRS-CHRM_HERO?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto',
   },
   {
      model: 'Carbon PRO',
      type: 'road',
      range: 'top',
      brand: 'Scott',
      description:
         'Con la suspensión delantera y trasera Future Shock, el nuevo Diverge STR ofrece cumplimiento sin concesiones. Al suspender al ciclista, en lugar de a la bicicleta, la tecnología Future Shock aumenta el control y la eficiencia al tiempo que disminuye la fatiga, por lo que conducirá más lejos y más rápido sobre terrenos más accidentados de lo que creía posible. Y el Diverge STR hace esto sin el peso, la respuesta lenta del pedal y la ineficiencia de otros sistemas de suspensión.',
      image: 'https://assets.specialized.com/i/specialized/96223-10_DIVERGE-STR-PRO-BLZ-VLTGSTPRL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'S-Works Diverge STR',
      type: 'road',
      range: 'top',
      brand: 'Kross',
      description:
         'Con la suspensión delantera y trasera Future Shock, la nuevo Diverge STR ofrece todo el rendimiento sin concesiones. Al suspender al ciclista, en lugar de la bicicleta, la tecnología Future Shock aumenta el control y la eficiencia al tiempo que disminuye la fatiga, por lo que montarás más lejos y más rápido sobre terrenos bacheados, incluso más de lo que creías posible. Y la Diverge STR lo hace sin el peso, la respuesta lenta a la pedalada y la ineficiencia de otros sistemas de suspensión.',
      image: 'https://assets.specialized.com/i/specialized/96223-00_DIVERGE-STR-SW-FSTGRN-DKMOS-BLKPRL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'SPARK RC SL EVO',
      type: 'road',
      range: 'high',
      brand: 'Kross',
      description:
         'Lista para el juego con los frenos de disco hidráulicos Shimano MT200, transmisión MicroSHIFT y una horquilla SR Suntour XCM hecha para el ajetreo; la Rockhopper Sport puede lograr la victoria cualquier domingo, ¡y el resto de la semana también!.',
      image: 'https://assets.specialized.com/i/specialized/97222-02_AETHOS-SW-ETAP-CARB-CMLNEYRS-CHRM_HERO?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto',
   },
   {
      model: 'Diverge E5-DR',
      type: 'road',
      range: 'high',
      brand: 'Scott',
      description:
         'La Diverge E5 utiliza nuestro cuadro de aluminio E5 premium y horquilla FACT íntegramente de carbono para una conducción rápida, segura y cómoda en carretera, tierra y grava gruesa. El grupo Shimano Claris 2x8 asegura un amplio rango de marchas para cualquier terreno y las llantas de aluminio Axis Elite con neumáticos Pathfinder Sport de 38mm ofrecen una conducción eficiente sobre asfalto con la versatilidad para conducir en tierra dura.',
      image: 'https://assets.specialized.com/i/specialized/95422-70_DIVERGE-E5-CSTBTLSHP-SILDST-CHRM_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Elite E5',
      type: 'road',
      range: 'high',
      brand: 'Specialized',
      description:
         'La Diverge Elite E5 utiliza nuestro cuadro de aluminio E5 premium y horquilla FACT íntegramente de carbono para una conducción rápida, segura y cómoda en carretera, tierra y grava gruesa. El grupo Shimano GRX 400 inspirado en gravel de 2x10 asegura marcha suave en cualquier terreno y las llantas de aluminio Axis Elite con neumáticos Road Sport de 35 mm ofrecen una conducción eficiente sobre asfalto con la versatilidad para conducir en tierra dura.',
      image: 'https://assets.specialized.com/i/specialized/95422-40_DIVERGE-E5-ELITE-LGNBLU-SMK-CHRM_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Diverge E5',
      type: 'road',
      range: 'mid',
      brand: 'Scott',
      description:
         'La Diverge E5 utiliza nuestro cuadro de aluminio E5 premium y horquilla FACT íntegramente de carbono para una conducción rápida, segura y cómoda en carretera, tierra y grava gruesa. El grupo Shimano Claris 2x8 asegura un amplio rango de marchas para cualquier terreno y las llantas de aluminio Axis Elite con neumáticos Pathfinder Sport de 38mm ofrecen una conducción eficiente sobre asfalto con la versatilidad para conducir en tierra dura.',
      image: 'https://assets.specialized.com/i/specialized/95422-70_DIVERGE-E5-CSTBTLSHP-SILDST-CHRM_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Elite E5-L2',
      type: 'road',
      range: 'mid',
      brand: 'Specialized',
      description:
         'La Diverge Elite E5 utiliza nuestro cuadro de aluminio E5 premium y horquilla FACT íntegramente de carbono para una conducción rápida, segura y cómoda en carretera, tierra y grava gruesa. El grupo Shimano GRX 400 inspirado en gravel de 2x10 asegura marcha suave en cualquier terreno y las llantas de aluminio Axis Elite con neumáticos Road Sport de 35 mm ofrecen una conducción eficiente sobre asfalto con la versatilidad para conducir en tierra dura.',
      image: 'https://assets.specialized.com/i/specialized/95422-40_DIVERGE-E5-ELITE-LGNBLU-SMK-CHRM_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'SPARK RC SL EVO AXS',
      type: 'road',
      range: 'mid',
      brand: 'Kross',
      description:
         'Lista para el juego con los frenos de disco hidráulicos Shimano MT200, transmisión MicroSHIFT y una horquilla SR Suntour XCM hecha para el ajetreo; la Rockhopper Sport puede lograr la victoria cualquier domingo, ¡y el resto de la semana también!.',
      image: 'https://assets.specialized.com/i/specialized/97222-02_AETHOS-SW-ETAP-CARB-CMLNEYRS-CHRM_HERO?bg=rgb(241,241,241)&w=2500&h=1406&fmt=auto',
   },
   {
      model: 'Turbo Vado Step-Through EQ',
      type: 'electric',
      range: 'ride',
      brand: 'Specialized',
      description:
         'No hay otra e-bike ahí fuera con la misma calidad de conducción, autonomía, potencia y ligereza como esta. La Turbo Vado Super Light 5.0 EQ Step- Through es la mejor para tus rutas diarias, recados rápidos y para moverte por la ciudad. Las luces integradas delantera y trasera te harán ver y ser visto. Los guardabarros DRYTECH te mantendrán lejos del agua y la suciedad de la carretera, y el portaequipaje trasero estará siempre listo para cuando lleves tus accesorios del día a día.',
      image: 'https://assets.specialized.com/i/specialized/93922-33_VADO-SL-50-ST-EQ-BRSH-BLKREFL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Turbo Vado 5.0 IGH',
      type: 'electric',
      range: 'ride',
      brand: 'Kross',
      description:
         'Vado es el vehículo para todo, desde viajes diarios al trabajo hasta entrenamientos rápidos y aventuras más largas de lo planeado: una bicicleta eléctrica para toda la vida. La experiencia de conducción en bicicleta eléctrica más fluida hasta el momento, Vado está diseñada para enfrentarse con audacia al paisaje en constante cambio que encontrará como ciclista diario, llevar lo que necesite y mantenerlo en bicicleta con más frecuencia.',
      image: 'https://assets.specialized.com/i/specialized/95322-31_VADO-50-IGH-CSTBLK-SILREFL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
   {
      model: 'Turbo Vado 4.0 Step-Through',
      type: 'electric',
      range: 'ride',
      brand: 'Scott',
      description:
         'Vado es el vehículo para todo, desde viajes diarios al trabajo hasta entrenamientos rápidos y aventuras más largas de lo planeado: una bicicleta eléctrica para toda la vida. La experiencia de conducción en bicicleta eléctrica más fluida hasta el momento, Vado está diseñada para enfrentarse con audacia al paisaje en constante cambio que encontrará como ciclista diario, llevar lo que necesite y mantenerlo en bicicleta con más frecuencia',
      image: 'https://assets.specialized.com/i/specialized/95022-58_VADO-40-ST-REDTNT-SILREFL_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
   },
]

//exports.bikes = bikes
exports.models = models

/**
 
 {
      model:'',
      type:'',
      range:'',
      brand:'',
      description:'',
      image:'',

   },
 */
