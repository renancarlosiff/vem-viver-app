import React, {useState} from "react";
import {SafeAreaView,View,Text,Pressable,ScrollView,StyleSheet,TextInput} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";

const C={bg:"#061525",card:"#0d2235",card2:"#122b40",gold:"#ffc43d",white:"#f8fafc",muted:"#96a8b8",line:"#1e3a50"};

const access={
 membro:{label:"Membro",items:[["calendar","Cultos"],["star","Eventos"],["heart","Oração"],["book","Conteúdos"],["people","Comunidade"],["card","Carteirinha"]]},
 pastoral:{label:"Líder • Pastoral",items:[["people","Minha Pastoral"],["person-add","Membros"],["calendar","Escalas"],["checkmark-circle","Presenças"],["star","Eventos"],["megaphone","Comunicados"]]},
 admin:{label:"Administrador",items:[["people","Membros"],["business","Pastorais"],["person-add","Usuários"],["calendar","Eventos"],["bar-chart","Relatórios"],["settings","Configurações"]]}
};

export default function App(){
 const [screen,setScreen]=useState("welcome");
 const [role,setRole]=useState("membro");

 if(screen==="welcome") return <SafeAreaView style={s.center}>
   <StatusBar style="light"/>
   <View style={s.hero}><Text style={s.cross}>✝</Text></View>
   <Text style={s.logo}>Vem Viver</Text><Text style={s.sub}>Comunidade Cristã</Text>
   <Text style={s.tag}>UMA IGREJA COM PROPÓSITOS</Text>
   <Text style={s.motto}>Mais Pessoas{"\n"}Mais Vida{"\n"}Mais Propósito</Text>
   <Pressable style={s.goldBtn} onPress={()=>setScreen("login")}><Text style={s.goldText}>Entrar</Text></Pressable>
 </SafeAreaView>;

 if(screen==="login") return <SafeAreaView style={s.center}>
   <StatusBar style="light"/><Text style={s.logo}>Vem Viver</Text><Text style={s.sub}>Comunidade Cristã</Text>
   <View style={s.loginCard}><Text style={s.title}>Bem-vindo!</Text><Text style={s.p}>Entre com sua conta Google para acessar o aplicativo.</Text>
    <Pressable style={s.google} onPress={()=>setScreen("register")}><Text style={s.g}>G</Text><Text style={s.googleText}>Continuar com Google</Text></Pressable>
   </View>
   <View style={s.privacy}><Ionicons name="shield-checkmark-outline" size={25} color={C.white}/><Text style={s.p}>O aplicativo usa sua identidade para reconhecer sua conta. Não acessa Gmail, mensagens, contatos ou Google Drive.</Text></View>
 </SafeAreaView>;

 if(screen==="register") return <SafeAreaView style={s.page}><StatusBar style="light"/><ScrollView contentContainerStyle={s.pad}>
   <Text style={s.title}>Complete seu cadastro</Text><Text style={s.p}>Estas informações pertencem ao cadastro da igreja.</Text>
   <Field label="Nome" value="Renan Carlos"/><Field label="Telefone" placeholder="(22) 99999-9999"/><Field label="Data de nascimento" placeholder="DD/MM/AAAA"/><Field label="Pastoral (opcional)" placeholder="Selecione"/>
   <Pressable style={s.goldBtn} onPress={()=>setScreen("home")}><Text style={s.goldText}>Salvar e continuar</Text></Pressable>
 </ScrollView></SafeAreaView>;

 const d=access[role];
 return <SafeAreaView style={s.page}><StatusBar style="light"/>
  <ScrollView contentContainerStyle={{padding:20,paddingBottom:100}}>
   <View style={s.top}><View><Text style={s.title}>Olá, Renan!</Text><Text style={s.p}>{d.label}</Text></View><View style={s.avatar}><Text style={s.avatarText}>RC</Text></View></View>
   <View style={s.banner}><Text style={s.bannerTiny}>VEM VIVER</Text><Text style={s.bannerText}>{role==="admin"?"Administrar\na serviço do Reino":role==="pastoral"?"Servir • Acolher\nTransformar":"Mais Pessoas\nMais Vida\nMais Propósito"}</Text><Text style={s.bigCross}>✝</Text></View>
   <View style={s.grid}>{d.items.map(([icon,name])=><Pressable style={s.tile} key={name}><Ionicons name={icon} size={29} color={C.gold}/><Text style={s.tileText}>{name}</Text></Pressable>)}</View>
   <View style={s.section}><Text style={s.sectionTitle}>Próximos Eventos</Text><Text style={s.link}>Ver todos →</Text></View>
   <Event day="20" title="Encontro de Jovens" sub="Sábado • 18:00"/>
   <Event day="27" title="Culto de Celebração" sub="Domingo • 19:00"/>
   <View style={s.demo}><Text style={s.demoTitle}>Teste de permissões do protótipo</Text><View style={s.roleRow}>
    {["membro","pastoral","admin"].map(r=><Pressable key={r} onPress={()=>setRole(r)} style={[s.roleBtn,role===r&&s.roleOn]}><Text style={s.roleText}>{r}</Text></Pressable>)}
   </View><Text style={s.demoSmall}>Na versão real o usuário não escolhe a função. O servidor identifica automaticamente a permissão vinculada à conta Google.</Text></View>
  </ScrollView>
  <View style={s.nav}>{[["home","Início"],["calendar","Agenda"],["heart","Oração"],["people","Comunidade"],["person","Perfil"]].map(([i,n])=><Pressable key={n} style={s.navItem}><Ionicons name={i} size={22} color={n==="Início"?C.gold:C.muted}/><Text style={[s.navLabel,n==="Início"&&{color:C.gold}]}>{n}</Text></Pressable>)}</View>
 </SafeAreaView>
}

function Field({label,value,placeholder}){return <View style={{marginTop:18}}><Text style={s.label}>{label}</Text><TextInput defaultValue={value} placeholder={placeholder} placeholderTextColor="#718393" style={s.input}/></View>}
function Event({day,title,sub}){return <View style={s.event}><View style={s.date}><Text style={s.day}>{day}</Text><Text style={s.month}>SET</Text></View><View><Text style={s.eventTitle}>{title}</Text><Text style={s.p}>{sub}</Text><Text style={s.p}>Templo Principal</Text></View><Ionicons name="chevron-forward" size={20} color={C.muted} style={{marginLeft:"auto"}}/></View>}

const s=StyleSheet.create({
 page:{flex:1,backgroundColor:C.bg},center:{flex:1,backgroundColor:C.bg,alignItems:"center",justifyContent:"center",padding:25},
 hero:{width:"100%",height:180,borderRadius:24,backgroundColor:"#16354b",alignItems:"center",justifyContent:"center",marginBottom:22},cross:{fontSize:110,color:C.gold},
 logo:{fontFamily:"serif",fontStyle:"italic",fontSize:51,color:C.gold},sub:{fontFamily:"serif",fontStyle:"italic",fontSize:22,color:C.white},tag:{fontSize:9,letterSpacing:4,color:C.white,marginTop:20},
 motto:{fontFamily:"serif",fontStyle:"italic",fontSize:24,lineHeight:34,textAlign:"center",color:C.white,marginVertical:26},goldBtn:{backgroundColor:C.gold,padding:16,borderRadius:12,alignItems:"center",width:"100%",marginTop:20},goldText:{fontWeight:"900",color:"#071421"},
 loginCard:{width:"100%",backgroundColor:C.card,borderRadius:20,padding:24,marginTop:35,alignItems:"center"},title:{fontSize:25,fontWeight:"900",color:C.white},p:{color:C.muted,lineHeight:20},google:{width:"100%",backgroundColor:C.white,padding:15,borderRadius:12,marginTop:20,flexDirection:"row",justifyContent:"center",gap:12},g:{fontWeight:"900",fontSize:18,color:"#4285f4"},googleText:{fontWeight:"800",color:"#152033"},privacy:{flexDirection:"row",gap:12,padding:18,marginTop:14,width:"100%"},
 pad:{padding:22},label:{color:C.white,fontWeight:"700",marginBottom:7},input:{backgroundColor:C.card2,borderColor:C.line,borderWidth:1,borderRadius:10,padding:14,color:C.white},
 top:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:20},avatar:{width:47,height:47,borderRadius:24,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},avatarText:{fontWeight:"900",color:C.bg},
 banner:{height:170,borderRadius:20,backgroundColor:"#17364d",padding:20,justifyContent:"center",overflow:"hidden"},bannerTiny:{fontSize:10,letterSpacing:4,color:C.gold},bannerText:{fontFamily:"serif",fontStyle:"italic",fontSize:27,color:C.white,marginTop:8},bigCross:{position:"absolute",right:25,fontSize:110,color:"#ffc43d55"},
 grid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:15},tile:{width:"31%",height:96,borderRadius:14,backgroundColor:C.card,alignItems:"center",justifyContent:"center",gap:8,padding:5},tileText:{fontSize:12,color:C.white,fontWeight:"700",textAlign:"center"},
 section:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:27},sectionTitle:{fontSize:19,fontWeight:"900",color:C.white},link:{fontSize:12,color:C.gold},
 event:{flexDirection:"row",alignItems:"center",gap:12,backgroundColor:C.card,padding:13,borderRadius:14,marginTop:10},date:{backgroundColor:C.card2,borderRadius:10,padding:8,alignItems:"center"},day:{fontSize:21,fontWeight:"900",color:C.white},month:{fontSize:10,fontWeight:"800",color:C.muted},eventTitle:{fontWeight:"800",color:C.white,marginBottom:3},
 demo:{backgroundColor:C.card,borderRadius:15,padding:14,marginTop:22},demoTitle:{color:C.white,fontWeight:"800",textAlign:"center"},roleRow:{flexDirection:"row",gap:7,marginTop:12},roleBtn:{flex:1,padding:10,backgroundColor:C.card2,borderRadius:9},roleOn:{backgroundColor:"#725b21"},roleText:{color:C.white,textAlign:"center",textTransform:"capitalize",fontSize:11},demoSmall:{fontSize:11,color:C.muted,textAlign:"center",lineHeight:16,marginTop:12},
 nav:{position:"absolute",bottom:0,left:0,right:0,height:78,backgroundColor:"#081827",borderTopColor:C.line,borderTopWidth:1,flexDirection:"row",justifyContent:"space-around",paddingTop:10},navItem:{alignItems:"center",gap:4},navLabel:{fontSize:10,color:C.muted}
});
