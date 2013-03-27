<?php 

namespace Atlas\GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use JMS\SecurityExtraBundle\Annotation\Secure;

class DefaultController extends Controller {

    public function galleryAction($galleryname='mowings') {
		//read the gallery from the S3 bucket        
		$url="http://atlas-content.turbosquid.com/collections/" . $galleryname . ".js";
		$data=file_get_contents($url);
		$array=json_decode($data);
        return $this->render('AtlasGalleryBundle:Default:index.html.twig', array('items' => $array, 'rawJson' => $data));
    }
    
	public function productAction($productid='') {
		//read the product from the S3 bucket
		$url="http://atlas-content.turbosquid.com/assets/" . $productid . "/index.json";
		$data=file_get_contents($url);
		$product=json_decode($data);
        return $this->render('AtlasGalleryBundle:Default:product.html.twig', array('item' => $product, 'id' => $productid, 'url' => $url, 'rawJson' => $data));
    }

    public function loginAction()
    {   $request = $this->getRequest();
        $session = $request->getSession();

        // get the login error if there is one
        if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR))
		{
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        }
		else
		{
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }
        return $this->render('AtlasGalleryBundle:Default:login.html.twig',array('last_username' => $session->get(SecurityContext::LAST_USERNAME),'error' => $error,));
                // last username entered by the user
        
    }
 }
?>
